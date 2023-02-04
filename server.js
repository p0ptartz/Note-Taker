const express = require('express')
const path = require('path')
const fs = require("fs")

const app = express()

const PORT = 3200

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})