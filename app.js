//jshint esversion:6
const mongoose = require('mongoose');
const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

  app.get('/', function (req, res) {
    res.sendFile('./views/index.html', { root: __dirname });
  });

  app.get('/profile', function (req, res) {
    res.sendFile('./views/profile.html', { root: __dirname });
  });

  app.get('/signup', function (req, res) {
    res.sendFile('./views/signup.html', { root: __dirname });
  });

  app.post("/", function(req,res){
    
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email
    const number = req.body.number
    const password = req.body.password
    const Password2 = req.body.Password2
    
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
                NUMBER: number,
                EMAIL: email,
                PASSWORD: password,
                PASSWORD2: Password2
                
            } 
        }]
    };

    const jsonData = JSON.stringify(data);

    const url=""


    const request= https.request(url,options,function(response) {

      if (response.statusCode === 200){
           res.sendFile("success")

      } else {
           res.sendFile("failure")
       } 
      

       response.on("data", function(data){
           console.log(JSON.parse(data));
       })

   })
   request.write(jsonData)
request.end();

});

app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});






