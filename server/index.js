const express = require("express");
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send("success");
});

app.listen(PORT, () => {
    console.log(`server is listing on port ${PORT}`);
});