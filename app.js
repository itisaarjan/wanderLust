const express=require('express');
const app=express();
const mongoose=require('mongoose');
const listing=require('./model/listing');


main().then(console.log("Database Connected Succesfully")).catch(err=>{
    console.log(`Error occured: ${err}`);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}

app.get('/',(req,res)=>{
    res.send("Server is working");
})

app.get('/testLink',(req,res)=>{
    let sampleListing=new listing({
        title:"My new villa",
        description:"By the beach",
        price:1200,
        location:"Kathmandu",
        country:"Nepal"
    });
    sampleListing.save()
    .then(result=>{
        res.send("Page is working")
        console.log(result);
    })
    .catch(err=>{
        console.log(err)
})
})

app.listen(8080,()=>{
    console.log("Port is working");
})