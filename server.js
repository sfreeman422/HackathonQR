const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configDB = require('./db/database.js');
const exphbs = require('express-handlebars');

// Configuration
mongoose.connect(configDB.url); // Connect to mongoDB
const db = mongoose.connection;

db.on('open', () => {
  console.log('Connected to Mongo');
});
db.on('error', (err) => {
  console.log(`Error connecting to Mongo: ${err}`);
});
require('./config/passport.js')(passport); // Pass passport to config passport

const app = express();
// set up our express application
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

// App.uses
app.use(express.static(`${process.cwd()}/public`));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// required passport stuff
app.use(session({ secret: 'whatisthissupposedtobe' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session

// routes
require('./routing/routes.js')(app, passport);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening on ${port}`);
