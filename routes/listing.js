const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const wrapAsync = require('../utils/wrapAsync');
const { validateListing } = require('../controllers/validateController');
const { isLoggedIn, isOwner } = require('../middleware');
const listingController = require('../controllers/listingController');
const multer=require('multer');
const {storage}=require("../cloudConfig");
const upload=multer({storage});


// Middleware to validate ObjectId
function isValidObjectId(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID");
        return res.redirect('/listings');
    }
    next();
}

// Route definitions using Router.route
router.route('/')
    .get(wrapAsync(listingController.index));

router.route('/new')
    .get(isLoggedIn, listingController.renderNewForm)
    .post(isLoggedIn,upload.single('Listing[image]'),validateListing,wrapAsync(listingController.createListing));

router.route('/edit/:id')
    .all(isLoggedIn, isOwner, isValidObjectId) // Apply middleware to all methods for this route
    .get(wrapAsync(listingController.renderEditForm))
    .post(upload.single('Listing[image]'),validateListing, wrapAsync(listingController.updateListing));

router.route('/:id')
    .all(isValidObjectId)
    .get(wrapAsync(listingController.showListing));

router.route('/delete/:id')
    .all(isLoggedIn, isOwner, isValidObjectId)
    .get(wrapAsync(listingController.deleteListing));

module.exports = router;
