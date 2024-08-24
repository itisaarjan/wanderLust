const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./model/listing');
const path = require('path');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const ListingSchema=require('./schema');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

main().then(() => console.log("Database Connected Successfully")).catch(err => {
    console.log(`Error occurred: ${err}`);
});

function main() {
    return mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

const validateListing=(req,res,next)=>{
    let {error}=ListingSchema.validate(req.body);
    if(error){
        let errormsg=error.details.map((el)=>el.message).join(',');
        throw new ExpressError(400,errormsg);
    }else{
        next();
    }
}

app.get('/', (req, res) => {
    res.send("Server is working");
});

app.get('/listings', wrapAsync(async (req, res, next) => {
    const result = await Listing.find({});
    res.render("./listings/index.ejs", { result });
}));

app.get('/listings/new', (req, res) => {
    res.render('./listings/addListing');
});

app.post('/listings/new',validateListing, wrapAsync(async (req, res, next) => {
    const listing = req.body.Listing;
    await Listing.create(listing); // Await the creation of the listing
    console.log("Added Successfully");
    res.redirect('/listings');
}));

app.get('/listings/edit/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    res.render('./listings/edit', { item });
}));

app.post('/listings/edit/:id',validateListing, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = req.body.Listing;
    await Listing.findByIdAndUpdate(id, listing);
    console.log("Updated document successfully");
    res.redirect('/listings');
}));

app.get("/listings/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    res.render('./listings/show', { item });
}));

app.get("/listings/delete/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.deleteOne({ _id: id });
    console.log('Deleted successfully');
    res.redirect('/listings');
}));

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something Wrong Occurred' } = err;
    res.status(statusCode).render("error",{err})
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Port is working");
});
