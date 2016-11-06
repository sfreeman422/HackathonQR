module.exports = function(app, passport){

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
		res.render("profile");
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		console.log(req);
		return next();
	//else
	res.redirect('/');
};
};