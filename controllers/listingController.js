const Listing = require('../model/listing');

module.exports.index = async (req, res) => {
    const result = await Listing.find({});
    res.render("./listings/index.ejs", { result });
};

module.exports.renderNewForm = (req, res) => {
    res.render('./listings/addListing');
};

module.exports.createListing = async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const listing = req.body.Listing;
    let result = new Listing(listing);
    result.owner = req.user._id;
    result.image={url,filename};
    await result.save();
    req.flash("success", "Listing added successfully!");
    res.redirect('/listings');
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    if (!item) {
        req.flash("error", "The listing does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl=item.image.url; 
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_200")
    res.render('./listings/edit', { item,originalImageUrl });

};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = req.body.Listing;
    let result=await Listing.findByIdAndUpdate(id, listing);
    if(typeof req.file!='undefined'){
        let url=req.file.path;
        let filename=req.file.filename;
        result.image={url,filename}
        await result.save()
    }
    req.flash('success', "Listing updated successfully");
    res.redirect('/listings');
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const item = await Listing.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate("owner");
    if (!item) {
        req.flash("error", "The listing does not exist");
        return res.redirect("/listings");
    }
    res.render('./listings/show', { item });
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully");
    res.redirect('/listings');
};
