const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../model/listing');
const review = require('../model/reviews');
const { validateReview } = require('./validate');
const ExpressError = require('../utils/ExpressError');
const flash=require('connect-flash');
const { isLoggedIn, isOwner, isAuthor } = require('../middleware');


// Review routes

router.post('/:id/reviews',isLoggedIn, validateReview, wrapAsync(async (req, res, next) => {
    let id = req.params.id;
    let result = await Listing.findById(id);
    let newReview = new review(req.body.review);
    newReview.author=req.user._id;
    result.reviews.push(newReview);

    await result.save();
    await newReview.save();
    req.flash("success","Review added succesfully");
    console.log("new review saved");
    res.redirect(`/listings/${result._id}`);
}));

router.delete('/:id/reviews/:reviewid',isLoggedIn,isAuthor, wrapAsync(async (req, res, next) => {
    let { id, reviewid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await review.findByIdAndDelete(reviewid);

    req.flash("success","review deleted successfully");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
