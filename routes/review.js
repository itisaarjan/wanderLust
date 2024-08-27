const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { validateReview } = require('../controllers/validateController');
const { isLoggedIn, isAuthor } = require('../middleware');
const reviewController = require('../controllers/reviewController');

// Review routes
router.route('/:id/reviews')
    .post(isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.route('/:id/reviews/:reviewid')
    .delete(isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
