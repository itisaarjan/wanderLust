const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('../utils/ExpressError');
const path=require('path');
const cookieParser=require('cookie-parser');
const session=require('express-session');



app.use(methodOverride('_method'));
app.set("views", path.join(__dirname,"..", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"..", "public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(cookieParser());

const listingRoutes = require('../routes/listing');
const reviewRoutes = require('../routes/review');

main().then(() => console.log("Database Connected Successfully")).catch(err => {
    console.log(`Error occurred: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

app.use('/listings', listingRoutes);
app.use('/listings', reviewRoutes);

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send("Server is working");
});

app.get('/addcookie',(req,res)=>{
    res.cookie("greet","value");
    res.send("Sent")
})

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something Wrong Occurred' } = err;
    res.status(statusCode).render("error", { err })
});

app.listen(8080, () => {
    console.log("Port is working");
});
