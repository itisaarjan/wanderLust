const express=require('express');
const router=express.Router();
const user=require("../model/user");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');

router.get('/signup',(req,res)=>{
    res.render("./users/signup");
})

router.post('/signup',wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser= new user({email,username});
    const registerUser=await user.register(newUser,password);
    req.login(registerUser,((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings")
    }))
    
    }catch(e){
        req.flash("error",e.message);
        res.redirect('/signup')
    }    
}))

router.get('/login',(req,res)=>{
    res.render('./users/login');
})

router.post('/login',saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res)=>{
    req.flash("success","Welcome back to wanderLust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
})
router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out successfully");
        res.redirect('/login')
    })
})


module.exports=router;