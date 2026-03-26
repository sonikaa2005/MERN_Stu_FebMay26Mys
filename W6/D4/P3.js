// Inspecting request details in an HTTP server 
//GET(get method is get the resource)
const http = require("http");

const server = http.createServer(function(req,res){
    
    res.writeHead(200,{"Content-Type": "text/plain"});
    //req.method tells the HTTP method, such as GET & POST
    res.end("Method:"+req.method+"\nURL:"+req.url);
});

server.listen(3001,function(){
    console.log("Server is running at http://localhost:3001");
});
//http://localhost:3001(it is a base URL . it let's the URL first)