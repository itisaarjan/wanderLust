const express=require('express');
const router=express.Router();
const user=require("../model/user");
const wrapAsync = require('../utils/wrapAsync');

router.get('/signup',(req,res)=>{
    res.render("./users/signup");
})

router.post('/signup',wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser= new user({email,username});
    const registerUser=await user.register(newUser,password);
    req.flash("success","Welcome to WanderLust");
    res.redirect("/listings")
    }catch(e){
        req.flash("error",e.message);
        res.redirect('/signup')
    }    
}))

router.get('login',(req,res)=>{
    res.render('./users/login');
})


module.exports=router;