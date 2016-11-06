//all the requires
var LocalStrategy = require('passport-local').Strategy;

//load the user model
var User = require('./user.js');

//expose this function to our app using module.exports
module.exports = function(passport){
	//passport session setup for persistent login sessions
	//pp needs to serialie/deserialize to track sessions

	//used to serialie the user for the session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	//used to deserialize the user
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//local SIGNUP using named strategies since we have one for login and signup
	//If there was no name, it would just be called local
//This entire thing is a strategy AKA a method that passport can use to authenticate. This will specifically use a mongo database to do this. 
	passport.use('local-signup', new LocalStrategy({
		//by default, local strat uses username and password, we will override with email
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true //allows us to passback the entire request to the callback
	}, 
	//The callback
	function(req, email, password, done){
		//asynchronous 
		//User.findOne wont fire unless data is sent back
		process.nextTick(function(){
			//find a user whose email is the same as the forms email
			//This checks to see if hte user who is trying to login exists in the db


//User.findOne is a mongoose thing that searches the mongodb for the object you pass in. 
			User.findOne({'local.email' : email }, function(err, user){

				//throw errs
				if(err)
					return done(err);

				//check to see if theres already a user with that email
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already in use.'));
				}else{
					//if user doesnt exist, create em

					//create the user
					var newUser = new User();

					//set the users local creds
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.isAdmin = false; 
					newUser.local.firstName = req.body.firstName;
					newUser.local.lastName = req.body.lastName;
					newUser.local.photoURL = req.body.photoURL;
					newUser.local.school = req.body.school;
					newUser.local.githubURL = req.body.githubURL;
					newUser.local.resumeURL = req.body.resumeURL;
					newUser.local.phoneNum = req.body.phoneNum;
					newUser.local.checkedIn = false; 
					newUser.local.ateBreakfast = false; 
					newUser.local.ateLunch = false;
					newUser.local.ateDinner = false; 
					//save the user
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

	//This is the login strategy
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		User.findOne({'local.email' : email}, function(err, user){
			if(err)
				return done(err);

			//if no user is found
			if(!user)
				return done(null, false, console.log("User not found."));
			//if user is found but pw is wrong
			if(!user.validPassword(password))
				return done(null, false, console.log("PW is wrong."));
			//if all is well login
			return done(null, user);
		});
	}));
};