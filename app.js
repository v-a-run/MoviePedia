const { concatSeries } = require('async');
const express = require('express')
const app = express();

app.use(express.static(__dirname + "/public"));
app.engine('html', require('ejs').renderFile);

app.get("/", (req, res) => {
    res.render("index.html")
})

app.get("/search", (req, res) => {
    res.render("search.html")
})

app.get("/wars", (req, res) => {
    res.render("wars.html")
})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Server started !");
})