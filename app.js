var express = require('express');
var app = express();
var bodyparser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host:'localhost',
    user: "root",
    password:"fakepassword",
    database: "world"
});

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) AS total FROM users';
    connection.query(q, function (error, results, fields){
        if (error) throw error;
        //console.log(results[0].total);
        var count = results[0].total;
        res.render("home", {count: count});
    });
});

app.get("/joke", function(req, res){
    var joke = "<strong>What's the difference between an enzyme and a hormone?</strong> <em>I can't make an enzyme!</em>";
    res.send(joke);
});

app.get("/random_number", function(req, res){
    var num = Math.floor((Math.random() * 100) + 1);
    res.send("☘ Your lucky number is... " + num + " ☘");
});

app.post("/register", function(req, res){
    //console.log("Post result sent to /register " + req.body.email.toString());
    var email = req.body.email.toString();
    var q = 'INSERT INTO users (email) VALUES ("' + email + '")';
    
    connection.query(q, function (error, results, fields){
        if (error) throw error;
        res.redirect("/");
    })
});

app.listen(8080, function () {
    console.log('App listening on port 8080!')
});