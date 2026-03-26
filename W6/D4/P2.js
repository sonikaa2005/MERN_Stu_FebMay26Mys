// Creating a simple HTTP server

const http = require("http");

/**createServer(): creates a HTTP server instance
 * Accepts a callback with two important objcts:
 * 1. req : incoming request details
 * 2. res : outgoing response control */

const server = http.createServer(function(req,res){
// writeHead() sets the response status code and headers
    res.writeHead(200,{"Content-Type": "text/plain"});
//end() sends the response body and closes the response
    res.end("Hello from NodeJS HTTP server.");
});

//listen() binds the server to a port and starts accepting a request
server.listen(3000,function(){
    console.log("Server is running at http://localhost:3000");
});
/**Port numbers : 0 - 1023(System ports)
 * 1024 - 49151 (Registered ports) (for our convinience)
 * numbers which are used in popular applications :
 * 27017 : mongoDB
 * same port number cannot be used simoultaneously. numbers start from 3000 is secure to use
 * same number can be use by different person without any conflict because of localhost
*/