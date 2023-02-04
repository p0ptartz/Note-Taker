const express = require('express')
const path = require('path')
const fs = require("fs")

const app = express()

const PORT = 3200

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
})