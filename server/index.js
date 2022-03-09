const express = require("express");
var bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 3001;

const DBConnection = require('./dao/database.js');

const notesRouter = require('./routers/notesRouter.js');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/hello", (req, res) => {
    res.send("Hello World!!");
});

app.use('/notes', notesRouter);

DBConnection.dial();

app.listen(PORT, () => {
    console.log(`server is listing on port ${PORT}`);
});