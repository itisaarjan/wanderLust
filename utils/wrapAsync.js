function wrapAsync(func){
    return function(req,res,next){
        func(req,res,next).catch(err=>{
            console.log(err);
            next;
        });
    }
}
module.exports=wrapAsync;