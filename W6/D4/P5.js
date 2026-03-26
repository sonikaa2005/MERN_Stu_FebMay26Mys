//Reading the POST body data

const http = require("http");

const server = http.createServer(function (req, res) {
    if (req.url == "/submit" && req.method === "POST") {
        let body = "";
        // req here is a readable stream(read stream is u can read from it cannot be write)
        req.on("data", function (chunk) {//chunk is small part of data in a entire of data
            body += chunk.toString();
        });

        //'end' executes when the full request body has been received
        req.on("end", function () {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Received req body data: " + body);
        });
        return;
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found.");
});
//server completion is done here
//listening to the request
server.listen(3001, function () {
    console.log("Server is running at http://localhost:3001");
});

//curl -X POST http://localhost:3001/users
//curl -X POST http://localhost:3001/submit -d "name=sonika&role=admin"