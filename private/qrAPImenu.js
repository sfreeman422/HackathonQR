// Node Dependency
var mysql = require('mysql');
var path = require('path');

// API End Point to add new user
function qrAPImenu(app, rootURL){

  app.get('/admin-api/:id', function(req, res){

    res.send('localhost:3000/' + 'signup.html')

    console.log(req)
  });

}


// Export to Sever.js
module.exports = qrAPImenu;