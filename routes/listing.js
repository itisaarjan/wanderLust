const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../model/listing');
const { validateListing } = require('./validate');
const ExpressError = require('../utils/ExpressError');
const flash=require('connect-flash')

// Listing routes

router.get('/', wrapAsync(async (req, res, next) => {
    const result = await Listing.find({});
    res.render("./listings/index.ejs", { result });
}));

router.get('/new', (req, res) => {
    res.render('./listings/addListing');
});

router.post('/new', validateListing, wrapAsync(async (req, res, next) => {
    const listing = req.body.Listing;
    await Listing.create(listing); // Await the creation of the listing
    req.flash("success","Listing added successfully!")
    console.log("Added Successfully");
    res.redirect('/listings');
}));

router.get('/edit/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    if(!item){
        req.flash("error","The listing does not exist");
        res.redirect("/listings");
    }
    res.render('./listings/edit', { item });
}));

router.post('/edit/:id', validateListing, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = req.body.Listing;
    await Listing.findByIdAndUpdate(id, listing);
    req.flash('success',"Listing updated successfully");
    console.log("Updated document successfully");
    res.redirect('/listings');
}));

router.get("/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id).populate('reviews');
    if(!item){
        req.flash("error","The listing does not exist");
        res.redirect("/listings");
    }
    res.render('./listings/show', { item });
}));

router.get("/delete/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.deleteOne({ _id: id });
    req.flash("success","Listing deleted succesfully")
    console.log('Listing Deleted successfully');
    res.redirect('/listings');
}));

module.exports = router;
