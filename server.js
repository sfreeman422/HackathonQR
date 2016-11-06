var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//mySQL connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'eventDB'
});
//Connects to the connection above. 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);
});

app.get("/", function(req, res){
	res.send("/public/index.html");
});

app.get("/login", function(req, res){
	res.send("/public/login.html");
})


//Listen on port 3000
var port = 3000;
//Creates a listener
app.listen(port);