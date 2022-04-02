const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const DBConnection = require('./dao/database');

const notesRouter = require('./routers/notesRouter');
const credRouter = require('./routers/credRouter');
const courseRouter = require('./routers/courseRouter');
const coursePlannerRouter = require('./routers/coursePlannerRouter')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())
app.use(cookieParser());

app.get("/hello", (req, res) => {
    res.send("Hello World!!");
});

app.use('/notes', notesRouter);
app.use('/', credRouter);
app.use('/course', courseRouter);
app.use('/coursePlanner', coursePlannerRouter);

DBConnection.dial();

app.listen(PORT, () => {
    console.log(`server is listing on port ${PORT}`);
});
