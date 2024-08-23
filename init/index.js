const mongoose=require('mongoose');
const listing=require("../model/listing");
const data=require("./sampleData");
main()
.then(()=>{
    console.log("Connected to database from sample data file");
})
.catch(err=>{
    console.log(`Error occured in connection: ${err}`);
})

async function main(){
    mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
}


listing.deleteMany({})
.then(()=>{
    console.log("Succesfully deleted");
})
.catch(err=>{
    console.log(`Error occured: ${err}`);
});

listing.insertMany(data.data)
.then(result=>{
    console.log(`Succesfully added data: ${result}`);
})
.catch(err=>{
    console.log(`Error occured : ${err}`);
})

