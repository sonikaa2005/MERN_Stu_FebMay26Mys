// Handling different HTTP methods in express
const express = require("express");
const app = express();
// To read
app.get("/users", function (req, res) {
    res.status(200).json([{message:"Success"},
        { id: 1, name: "alice" },
        { id: 2, name: "meera" },
        { id: 3, name: "saara" },

    ]);
   // res.send("Returning all users");
});

// To create
app.post("/users", function (req, res) {
    // res.status() sets the HTTP status code before sending the response body
    res.status(201).send("User created.");
});
app.listen(4000, function () {
    console.log("Express server running at http://localhost:4000");
});