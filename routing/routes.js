module.exports = function(app, passport){
var User = require('../config/user.js');
//Gets the index.html and servers it when hitting /
	app.get("/", function(req, res){
		res.render("index");
	});
//Gets the login form and serves it when hitting /login with a get
	app.get("/login", function(req, res){
		res.render("login");
	})
//Posts the login form to the login route with a post request. 
	app.post("/login", passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));
//Gets the sign up form 
	app.get("/signup", function(req, res){
		res.render("signup");
	})
//Posts the sign up form
	app.post("/signup", passport.authenticate('local-signup', {
		successRedirect: '/profile', //redirect to the secure profile
		failureRedirect: '/', //redirect back to signup page
		failureFlash: true //allow flash messsages
	}));
//Gets the protected profile view. 
	app.get('/profile', isLoggedIn, function(req, res){
    console.log(req.user.local);
    let qrEmail = req.user.local.email;
    qrEmail = qrEmail.replace('@', '%40');
		var userObj = {
			fullName: req.user.local.firstName + " " + req.user.local.lastName,
			photoURL: req.user.local.photoURL,
			school: req.user.local.school,
			endpointURL: "https://hackorg.herokuapp.com",//not finished
			qrcode: "http://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fhackorg.herokuapp.com%2Fupdate%2F"+qrEmail+"&size=200x200"
		}
		res.render("profile", userObj);
	});
//Get request for the update page. This page should provide information based on the :email and options to checkin and track meals. 
	app.get('/update/:email', isLoggedIn, function(req, resp){
		if(req.user.local.isAdmin){
			var studentUpdate = req.params.email; 
			User.findOne({"local.email": studentUpdate}, function(err, res){
				console.log(res);
				var userObj = {
					fullName: res.local.firstName + " " + res.local.lastName,
					photoURL: res.local.photoURL,
					school: res.local.school,
					email: res.local.email
				}
				resp.render("updateinfo", userObj);
			});
		}
		else{
			resp.render("index");
		}
	});
//Route to update the desired task for the specific user. 
	app.get('/update/:email/:updateTask', isLoggedIn, function(req, res){
		if(req.user.local.isAdmin){
			var userUpdate = req.params.email;
			var updateTask = req.params.updateTask;
			console.log(updateTask);
			var userCheckedIn;
			var userAteBreakfast;
			var userAteLunch;
			var userAteDinner;

//This starts the entire mongo stuff to update the DB. 
			User.findOne({"local.email": userUpdate}, function(err, res){
				userCheckedIn = res.local.checkedIn;
				userAteBreakfast = res.local.ateBreakfast; 
				userAteLunch = res.local.ateLunch;
				userAteDinner = res.local.ateDinner;

			console.log("UserID: "+userUpdate);
			console.log("Checked In: "+userCheckedIn);
			console.log("Ate Breakfast: "+userAteBreakfast);
			console.log("Ate Lunch: "+userAteLunch);
			console.log("Ate Dinner: "+userAteDinner);

			if(updateTask == "checkIn"){
				if(userCheckedIn == false){
						User.findOneAndUpdate({"local.email": userUpdate}, {"local.checkedIn": true}, function(err, resp){
            console.log(resp);
					})
				}
				else{
					User.findOneAndUpdate({"local.email": userUpdate}, {"local.checkedIn": false}, function(err, resp){
						console.log(resp);
					})
				}
			}
			else if (updateTask == "breakfast"){
				if(userAteBreakfast == false){
				User.findOneAndUpdate({"local.email": userUpdate}, {"local.ateBreakfast": true}, function(err, resp){
						console.log(resp);
					})					
				}
				else{
					console.log("User has already eaten breakfast");
				}
			}
			else if (updateTask == "lunch"){
				if(userAteLunch == false){
				User.findOneAndUpdate({"local.email": userUpdate}, {"local.ateLunch": true}, function(err, resp){
						console.log(resp);
					})	
				}
				else{
					console.log("User already ate lunch");
				}
			}
			else if (updateTask == "dinner"){
				if(userAteDinner == false){
					User.findOneAndUpdate({"local.email": userUpdate}, {"local.ateDinner": true}, function(err, resp){
						console.log(resp);
					})
				}
				else{
					console.log("User has already ate dinner.");
				}
			}
			else{
				console.log("Invalid input");
			}
		});
	};
//Ends the mongo stuff
});


	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
//Tests if the user is logged in, if so, do the next thing, if not, redirect to main page. 
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	//else
	res.redirect('/');
};
};