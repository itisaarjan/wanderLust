const mongoose = require('mongoose');
const fetch = require('node-fetch'); // Or another HTTP request library
const Listing = require('./model/listing'); // Adjust path as needed

const mongoURI = 'mongodb://localhost:27017/yourdbname'; // Replace with your MongoDB URI
const mapboxToken = 'YOUR_MAPBOX_API_KEY'; // Replace with your Mapbox API key

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

async function geocodeLocation(location) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      location
    )}.json?access_token=${mapboxToken}&limit=1`
  );
  const data = await response.json();
  if (data.features && data.features.length > 0) {
    const [longitude, latitude] = data.features[0].geometry.coordinates;
    return { latitude, longitude };
  }
  throw new Error(`Geocoding failed for location: ${location}`);
}

async function addGeometryToListings(listings) {
  const updatedListings = [];

  for (let listing of listings) {
    try {
      const geometry = await geocodeLocation(
        `${listing.location}, ${listing.country}`
      );
      updatedListings.push({ ...listing, geometry });
    } catch (error) {
      console.error(error);
    }
  }

  return updatedListings;
}

async function updateListings() {
  try {
    const listings = await Listing.find(); // Fetch all listings from the database
    const updatedListings = await addGeometryToListings(listings);

    // Update each listing in the database
    for (const listing of updatedListings) {
      await Listing.findByIdAndUpdate(listing._id, listing);
    }

    console.log('Listings updated successfully.');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

updateListings();
