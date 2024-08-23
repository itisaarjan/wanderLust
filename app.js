const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./model/listing');
const path = require('path');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:false}));

main().then(() => console.log("Database Connected Successfully")).catch(err => {
    console.log(`Error occurred: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

app.get('/', (req, res) => {
    res.send("Server is working");
});

app.get('/listings', async (req, res) => {
    try {
        const result = await listing.find({});
        res.render("./listings/index.ejs", { result });
        console.log(result);
    } catch (err) {
        console.log(`Error occurred while listing all the items: ${err}`);
        res.status(500).send("An error occurred while fetching listings.");
    }
});
app.get("/listings/:id",async (req,res)=>{
    const {id}=req.params;

    const item=await listing.findById(id);

    res.render('./listings/show',{item});

})

app.listen(8080, () => {
    console.log("Port is working");
});


