//Handling different GET routes

const http = require("http");

const server = http.createServer(function(req,res){
    if (req.method === "GET" && req.url === "/"){ 
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Home Page / Dashboard");
        return;
    }

        if (req.method === "GET" && req.url === "/about"){ 
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("About Route. Welcome to About Us Page.");
        return;
    }

    if (req.method === "GET" && req.url === "/products"){ 
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Products Route. Welcome to products Page.");
        return;
    }

      if (req.method === "GET" && req.url === "/users"){ 
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("Returning to all users.");
        return;
    }
    //POST=create
    /**CURL- client_URL 
     * curl -X POST http://localhost:3001/users
     * curl: Client URL: free,open src cli(command line interface)- 
     * -tool used to transfer data to or from a server using various network protocol.
     * another tool used beside of curl is PostMan tool
     */
      if (req.method === "POST" && req.url === "/users"){ 
        res.writeHead(201,{"Content-Type":"text/plain"});
        res.end("New User Created.");
        return;
    }
    //Unknown route fallback
    res.writeHead(404,{"Content-Type":"text/plain"});
    res.end("Route notfound.")
});

server.listen(3001,function(){
    console.log("Server is running at http://localhost:3001");
});