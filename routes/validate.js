const ListingSchema = require('../schema');
const { reviewSchema1 } = require('../schema');
const ExpressError = require('../utils/ExpressError');

module.exports.validateListing = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        const errormsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errormsg);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema1.validate(req.body);
    if (error) {
        const errormsg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, errormsg);
    } else {
        next();
    }
}
