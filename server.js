// Dependencies
var express = require("express");
const fs = require("fs");

var app = express();
const PORT = process.env.PORT || 8000;

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    fs.readFile(
        "./db/db.json",
        "utf8",
        function (err, content) {
            console.log(content);
            res.json(JSON.parse(content));
        },
        function (err) {
            console.log(err);
        }
    );
    console.log("Showing Notes.");
});

// - POST`/api/notes` - Should receive a new note to save on the request body, add it to the`db.json` file, and then return the new note to the client.
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
