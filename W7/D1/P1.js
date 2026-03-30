// Basic of ExpressJS - setup
// npm init -y
// npm install express

//Import module of Express
const express = require("express");

//calling express() creates the main application object
//This object is used to register routes and middleware
const app = express();

//To create a server
//app.get() handles GET requests for a specific path
app.get("/",function(req,res){
    //res.send() send a rsponse body and ends the rquest automatically
    res.send("Hello from express server");
}); // "/" it indicates base URL
//server created

//listen to the request
//listen() starts the server on a choosen port number
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});