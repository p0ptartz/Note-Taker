const express = require('express')
const path = require('path')
const fs = require("fs")
const crypto = require("crypto")

// function to generate rando id number to link to db.json file
function id() {
    return crypto.randomBytes(16).toString("hex");
}

const app = express()

const PORT = process.env.PORT || 3200

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})


app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        res.json(JSON.parse(data))
    })
})

app.post("/api/notes", (req, res) => {
    // deconstructing req.body to store in new var with id added as well
    const { title, text } = req.body
    const newNote = {
        title,
        text,
        id: id()
    }
    fs.readFile("./db/db.json", (err, data) => {
        // parsing data for db.json and storing it in new variable 
        let noteText = JSON.parse(data)
        // placing data into new note object
        noteText.push(newNote)
        // writes new info into db.json
        fs.writeFile("./db/db.json", JSON.stringify(noteText, null, 4), (err) => {
            if (err) {
                throw err
            } else {
                res.json("Note Saved!")
            }
        }
        )
    })
})


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})