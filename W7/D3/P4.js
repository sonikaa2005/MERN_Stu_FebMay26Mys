//Custom error classes 
const express = require("express");
const app = express();
//custom error class
class AppError extends Error{
      constructor(message,statusCode){
        //super is the keyword calls from  the parent constructor

        super(message);
        //this keyword is used to refere the current instance of the class
        this.statusCode = statusCode;
      }
}
app.get("/product",function(req,res,next){
    next(new AppError("product not found"),404)
});
app.get("/search",function(req,res,next){
    if(!req.query.q) {
      return  next(new AppError("Search query is required"),404);
    }
    res.json({
        success:true,
        query:req.query.q
    });
});

app.use(function(error,req,res,next){
    res.status(error.statusCode || 500).json({
        success:false,
        message:error.message,
        statusCode:error.statusCode || 500
        });
});
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});

//http://localhost:4000/product
//http://localhost:4000/search
//http://localhost:4000/search?q=iphone