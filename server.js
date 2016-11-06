//requires
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./db/database.js');

//Configuration
mongoose.connect(configDB.url); //Connect to mongoDB

require('./config/passport')(passport) //Pass passport to config passport

//set up our express application
app.use(express.static(process.cwd() + '/public'));
app.use(morgan('dev')); //log every request to the console
app.use(cookieParser()); // read cookies for session
app.use(bodyParser()); //get information from HTML forms

//required passport stuff
app.use(session({secret: 'whatisthissupposedtobe'}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login session
app.use(flash()); //use connect flash for flash messages

//routes
require('./routing/routes.js')(app, passport); //load our routes and pass in app and fully configured passport

app.listen(port);
console.log("Listening on "+port);