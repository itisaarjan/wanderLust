const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// Set up session and flash
app.use(session({
    secret: 'yourSecretKey', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // For development; change to true in production with HTTPS
}));
app.use(flash());

app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);

// Middleware to make flash messages available to all views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const listingRoutes = require('./routes/listing');
const reviewRoutes = require('./routes/review');

main().then(() => console.log("Database Connected Successfully")).catch(err => {
    console.log(`Error occurred: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}

app.use('/listings', listingRoutes);
app.use('/listings', reviewRoutes);

app.get('/', (req, res) => {
    res.send("Server is working");
});

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something Wrong Occurred' } = err;
    res.status(statusCode).render("error", { err });
});

app.listen(8080, () => {
    console.log("Port is working");
});
