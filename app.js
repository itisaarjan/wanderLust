const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./model/listing'); // Corrected capitalization
const path = require('path');
const ejsMate=require('ejs-mate');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs',ejsMate);

main().then(() => console.log("Database Connected Successfully")).catch(err => {
    console.log(`Error occurred: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

app.get('/', (req, res) => {
    res.send("Server is working");
});

app.get('/listings', async (req, res) => {
    try {
        const result = await Listing.find({});
        res.render("./listings/index.ejs", { result });
        console.log(result);
    } catch (err) {
        console.log(`Error occurred while listing all the items: ${err}`);
        res.status(500).send("An error occurred while fetching listings.");
    }
});

app.get('/listings/new', (req, res) => {
    res.render('./listings/addListing');
});

app.post('/listings/new', async (req, res) => {
    try {
        await Listing.create({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            location: req.body.location,
            country: req.body.country
        });
        console.log("Added Successfully");
        res.redirect('/listings');
    } catch (err) {
        console.log(`Error occurred: ${err}`);
        res.status(500).send("Error occurred");
    }
});

app.get('/listings/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let item = await Listing.findById(id);
        res.render('./listings/edit', { item });
    } catch (err) {
        console.log(err);
        res.status(500).send(`Could not find it`);
    }
});

app.post('/listings/edit/:id', async (req, res) => {
    const { id } = req.params;
    const updatedFields = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        location: req.body.location,
        country: req.body.country
    };

    try {
        await Listing.findByIdAndUpdate(id, updatedFields);
        console.log("Updated document successfully");
        res.redirect('/listings');
    } catch (err) {
        console.log(`Error occurred: ${err}`);
        res.status(500).send(`Error occurred while updating`);
    }
});

app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Listing.findById(id);
        res.render('./listings/show', { item });
    } catch (err) {
        console.log(`Error occurred while fetching the listing: ${err}`);
        res.status(500).send("Error occurred while fetching the listing.");
    }
});

app.get("/listings/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Listing.deleteOne({ _id: id }); // Corrected the delete query
        console.log('Deleted successfully');
        res.redirect('/listings');
    } catch (err) {
        console.log(`Error occurred while deleting: ${err}`);
        res.status(500).send(`Error occurred while deleting`);
    }
});

app.listen(8080, () => {
    console.log("Port is working");
});
