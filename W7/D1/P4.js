/**Middleware usage in Express
 * Middleware runs during the request-response cycle
 * Middleware can inspect or change the request before a route responds
 * next() passess control to the next step
 */

const express=require("express");

const app=express();

//app.use registers middleware. (app is a userdefined name)
//This middleware runs for every incoming request.

app.use(function(req,res,next){
    console.log("Request recevied",req.method,req.url);
//next()nisrequired when this middleware does not finish the response
    next();
});

app.get("/",function(req,res){
    res.send("Middleware executed before the route");
});

app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});

//curl -X POST http://localhost:4000/users