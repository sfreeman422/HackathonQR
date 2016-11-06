//load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define the schema for our mongoDB user model
var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        isAdmin      : Boolean,
        firstName    : String,
        lastName     : String,
        photoURL     : String,
        school       : String,
        githubURL     : String,
        resumeURL    : String,
        phoneNum     : String,
        checkedIn    : Boolean,
        ateBreakfast : Boolean,
        ateLunch     : Boolean,
        ateDinner    : Boolean  
    }
});

//generate a hash
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check if pw is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);

};

//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);