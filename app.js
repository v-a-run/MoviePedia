const { concatSeries } = require('async');
const express = require('express')
const app = express();

app.use(express.static(__dirname + "/public"));
app.engine('html', require('ejs').renderFile);

app.get("/", function(req, res){
    res.render("MovieWars.html")
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server started !");
})