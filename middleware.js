const Listing=require("./model/listing");

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