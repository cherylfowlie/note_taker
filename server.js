// Dependencies
var express = require("express");
const fs = require("fs");
const path = require("path");

var app = express();
const PORT = process.env.PORT || 8000;

var notesData = [];

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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
///Post New Note///
// writes the new note to the json file
app.post("/api/notes", function (req, res) {
    try {
        // reads the json file
        notesData = fs.readFileSync("./db/db.json", "utf8");
        console.log(notesData);

        // parse the data to get an array of objects
        notesData = JSON.parse(notesData);
        // Set new notes id
        req.body.id = notesData.length;
        // add the new note to the array of note objects
        notesData.push(req.body); // req.body - user input
        // make it string(stringify)so you can write it to the file
        notesData = JSON.stringify(notesData);
        // writes the new note to file
        fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
            // error handling
            if (err) throw err;
        });
        // changeit back to an array of objects & send it back to the browser(client)
        res.json(JSON.parse(notesData));

        // error Handling
    } catch (err) {
        throw err;
        console.error(err);
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
