const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  var currentNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    var currentDb = JSON.parse(data);
    currentDb.push(currentNote);
    fs.writeFile("db/db.json", JSON.stringify(currentDb), (err) => {
      err ? console.log(err) : console.log("New Note Saved");
    });
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
  });
});



module.exports = router;
