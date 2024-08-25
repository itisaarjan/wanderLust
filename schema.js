
const joi=require('joi');

const schema=joi.object({
    Listing:joi.object({
        title:joi.string()
    .required(),

    description:joi.string()
    .required(),
    imageUrl:joi.string().allow("",null),
    price:joi.number().required().min(0),
    location:joi.string().required(),
    country:joi.string().required()
    }).required()
})

module.exports=schema;

module.exports.reviewSchema1 = joi.object({
    review: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(1).max(5),
    }).required()
});

