const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../model/listing');
const { validateListing } = require('./validate');
const ExpressError = require('../utils/ExpressError');
const flash = require('connect-flash');
const { isLoggedIn, isOwner } = require('../middleware');

// Middleware to validate ObjectId
function isValidObjectId(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID");
        return res.redirect('/listings');
    }
    next();
}

// Listing routes

router.get('/', wrapAsync(async (req, res, next) => {
    const result = await Listing.find({});
    res.render("./listings/index.ejs", { result });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('./listings/addListing');
});

router.post('/new', isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const listing = req.body.Listing;
    let result = new Listing(listing);
    result.owner=req.user._id;
    await result.save();
    req.flash("success", "Listing added successfully!");
    res.redirect('/listings');
}));

router.get('/edit/:id', isLoggedIn,isOwner, isValidObjectId, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    if (!item) {
        req.flash("error", "The listing does not exist");
        return res.redirect("/listings");
    }
    res.render('./listings/edit', { item });
}));

router.post('/edit/:id', isLoggedIn,isOwner, isValidObjectId, validateListing, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = req.body.Listing;
    await Listing.findByIdAndUpdate(id, listing);
    req.flash('success', "Listing updated successfully");
    res.redirect('/listings');
}));

router.get("/:id", isValidObjectId, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id).populate({path:'reviews',populate:{
        path:'author'
    }}).populate("owner");
    if (!item) {
        req.flash("error", "The listing does not exist");
        return res.redirect("/listings");
    }
    res.render('./listings/show', { item });
}));

router.get("/delete/:id", isLoggedIn,isOwner, isValidObjectId, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully");
    res.redirect('/listings');
}));

module.exports = router;
