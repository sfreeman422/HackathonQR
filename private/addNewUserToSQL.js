// Node Dependency
var mysql = require('mysql');
var path = require('path');

// API End Point to add new user
function addNewUserToSQL(app){

  app.post('/api/signup', function (req, res) {

    // mySQL connection
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'Iforget123',
      database : 'eventDB'
    });

    // Connects to the connection above. 
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }

      console.log('connected as id ' + connection.threadId);
  
      // Add new student into database
      connection.query('INSERT INTO users SET ?', {
        isAdmin: false,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photoURL: req.body.photoURL,
        school: req.body.school,
        githubURL: req.body.githubURL,
        resumeURL: req.body.resumeURL,
        phoneNum: req.body.phoneNum,
        email: req.body.email,
        pwd: req.body.pwd,
        checkedIn: false,
        ateBreakfast: false,
        ateLunch: false,
        ateDinner: false
      }, function(error, response){

        // Slighly more refined Error Handler
        if(error){
          console.log('\nSorry. The SQL database could not be updated.');
          connection.end(); // end the script/connection
        }
        else{
          console.log('User added successfully.')
          connection.end(); // end the script/connection
          res.json(req.body.firstName); // send back user's name

        }

      });
        
    }); // end SQL connection

  }); // end API connection

}



// Export to Sever.js
module.exports = addNewUserToSQL;