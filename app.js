const express=require('express');
const app=express();
const mongoose=require('mongoose');


main().then(console.log("Database Connected Succesfully")).catch(err=>{
    console.log(`Error occured: ${err}`);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}

app.get('/',(req,res)=>{
    res.send("Server is working");
})


app.listen(8080,()=>{
    console.log("Port is working");
})