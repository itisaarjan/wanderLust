const Listing=require("./model/listing");
const Review=require("./model/reviews");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","User must be logged in! ");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    const { id } = req.params;
    const listing = req.body.Listing;
    let result=await Listing.findById(id);
    if(!(result.owner.equals(req.user._id))){
        req.flash('error',"the user does not have access to this listing");
         return res.redirect("/listings");
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { reviewid } = req.params;
    const { id } = req.params; // id of the listing

    // Fetch the review by ID
    let review = await Review.findById(reviewid);
    
    // Check if the review exists
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }

    // Check if the logged-in user is the author of the review
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    
    next();
};