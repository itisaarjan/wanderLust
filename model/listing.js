const mongoose=require('mongoose');
const review=require('./reviews');
const user=require("./user");

let listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        url:String,
        filename:String,
},
    price:{
        type:Number,
        default:0
    },
    location:{
        type:String
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in: listing.reviews}})
    }
})


const listing=mongoose.model("Listing",listingSchema);



module.exports=listing;