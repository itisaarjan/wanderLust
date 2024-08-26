const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../model/listing');
const review = require('../model/reviews');
const { validateReview } = require('./validate');
const ExpressError = require('../utils/ExpressError');

// Review routes

router.post('/:id/reviews', validateReview, wrapAsync(async (req, res, next) => {
    let id = req.params.id;
    let result = await Listing.findById(id);
    let newReview = new review(req.body.review);
    result.reviews.push(newReview);

    await result.save();
    await newReview.save();

    console.log("new review saved");
    res.redirect(`/listings/${result._id}`);
}));

router.delete('/:id/reviews/:reviewid', wrapAsync(async (req, res, next) => {
    let { id, reviewid } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await review.findByIdAndDelete(reviewid);

    res.redirect(`/listings/${id}`);
}));

module.exports = router;
