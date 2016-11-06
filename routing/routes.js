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
		var userObj = {
			fullName: req.user.local.firstName + " " + req.user.local.lastName,
			photoURL: req.user.local.photoURL,
			school: req.user.local.school,
			endpointURL: "http://localhost:3000/",//not finished
			qrcode: "http://api.qrserver.com/v1/create-qr-code/?data="+req.user.local.email+"&size=200x200"
		}
		res.render("profile", userObj);
	});
//Get request for the update page. This page should provide information based on the :email and options to checkin and track meals. 
	app.get('/update/:email', isLoggedIn, function(req, res){
		if(req.user.local.isAdmin){
			var studentUpdate = req.params.email; 
			User.findOne({"local.email": studentUpdate}, function(err, res){
				console.log(res);
			})
			res.render("profile");
		}
		else{
			res.render("index");
		}
	})

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