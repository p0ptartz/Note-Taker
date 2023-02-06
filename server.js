const express = require('express')
const path = require('path')
const fs = require("fs")
const crypto = require("crypto")

function id() {
    return crypto.randomBytes(16).toString("hex");
}

const app = express()

const PORT = 3200

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})


// get /api/notes fs readfile dbjson -- return as json
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        res.json(JSON.parse(data))
    })
})

// post /api/notes fs readfile dbjson -- new note = req.body -- writefile db/db.json ??
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body
    const newNote = {
        title,
        text,
        id: id()
    }
    console.log(newNote)
    fs.readFile("./db/db.json", (err, data) => {
        let noteText = JSON.parse(data)
        console.log(noteText)
        noteText.push(newNote)
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