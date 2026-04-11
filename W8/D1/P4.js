// Sorting, limiting and Pagination
const mongoose = require("mongoose");
const Product = require("./P3"); //importing from P3.js

async function sortPaginationDemo(){
    try{
        await mongoose.connect("mongodb://localhost:27017/merntraining");
        console.log("MongoDB connected successfully");

        const sortedAscending = await Product.find({category: "Electronics"}).sort({price:1});
        console.log(sortedAscending);

        await mongoose.connection.close();
        console.log("connection closed");
    }
     catch(error){
        console.log("sort_Pagination demo error:",error.message);
    }
}
sortPaginationDemo();