// const express = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user: "root",
    password:"PobrePucho24",
    database: "world"
});
// connection.connect(function(err){
//     if(err)
//     {
//         console.log(err)
//     }else{
//         console.log("Connected")
//         connection.query("use learning_schema", function(err, r){
//             if(err)
//             {
//                 console.log(err)
//             }else{
//                 console.log("Using the right schema")
//             }
//         }
//         )
//     }
// })
const { faker } = require('@faker-js/faker')
// console.log(faker.internet.email());
// console.log(faker.date.past());
function generateAddress(){
    console.log(faker.address.streetAddress());
    console.log(faker.address.city());
    console.log(faker.address.state());
}
//generateAddress();


//SELECTING DATA
// var q = 'SELECT COUNT(*) AS total FROM users';
// connection.query(q, function (error, results, fields){
//     if (error) throw error;
//     // console.log(results[0].time.toString());
//     // console.log(results[0].date.toString());
//     // console.log(results[0].now);
//     console.log(results[0].total);
// })


//INSERTING DATA STATICALLY
// var q = 'INSERT INTO users (email) VALUES ("wyatt_the_dog@gmail.com")';
// connection.query(q, function (error, results, fields){
//     if (error) throw error;
//     console.log(results);
// })


//INSERTING DATA DYNAMICALLY
// var person = {
//     email: faker.internet.email(),
//     created_at: faker.date.past()
// };
// end_result = connection.query('INSERT INTO users SET ?', person, function (error, results, fields){
//     if (error) throw error;
//     console.log(results);
// })
// console.log(faker.date.past().toString());
//console.log(end_result.sql)


//INSERTING LOTS OF DATA DYNAMICALLY
var data = [];
for(var i = 0; i < 500; i++){
    data.push([
        faker.internet.email(), 
        faker.date.past()
    ]);
}
var q = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(q, [data], function(err, result){
    console.log(err);
    console.log(result);
})
//console.log(data)
connection.end();