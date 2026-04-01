//Handling asynchronous errors with callbacks
const express =  require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/file",function(req,res,next){
      const filepath = path.join(__dirname,"newFile.txt");
      fs.readFile(filepath,"utf-8",function(error,data){
        if(error){
            //Forward the async error
            return next(error);
        }
        res.send(data);
      });
});
//centralized error handling middleware
app.use(function(error,req,res,next){
    res.status(404).json({
        success:false,
        message:"File/folder does not exists",
        //Originalmessage:error.message
    });
});
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});

//http://localhost:4000/file