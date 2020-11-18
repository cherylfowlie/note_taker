// Dependencies
var express = require("express");
const fs = require("fs");
const path = require('path');

var app = express();
const PORT = process.env.PORT || 8000;


var notesArr = [];

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.get("/api/notes", function (req, res) {
    return res.sendFile(path.json(__dirname, "./db/db.json"));
});


// GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    fs.readFile(
        "./db/db.json",
        "utf8",
        function (err, notesArr) {
            console.log(notesArr);
            res.json(JSON.parse(notesArr));
        },
        function (err) {
            console.log(err);
        }
    );
    console.log("Showing Notes.");
});

// - POST`/api/notes` - Should receive a new note to save on the request body, add it to the`db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {

    const id = assignID();

    fs.readFile('./db/db.json', 'utf8', function (err, notesArr) {
        const notes = JSON.parse(notesArr);
        notes.push({ id, ...req.body });

        fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
            console.log(err);
        });
        console.log('Note Posted ' + id + notes);
        res.json(notes);

    });


});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
