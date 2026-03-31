//Third-party middleware are available @ npm registry

const express = require("express");

const morgan = require("morgan"); //third-party middleware for logging HTTP requests

const cors = require("cors");
//cors is a middleware that enable cores-origin resource sharing, allowing your server to handle requests from different origins (domains) in a secure way. It is commonly used in production environments to enable cross-origin requests from frontend applications hosted on different domains.
const app = express();

app.use(morgan("dev")); // use morgan middleware for logging in development format
app.use(cors()); // it is used during the production server

app.get("/",function(req,res){
    res.json({
        message: "Third-party middleware executed before this response"
    });
});
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});

//http://localhost:4000/