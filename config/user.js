// load the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// define the schema for our mongoDB user model
const userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    isAdmin: Boolean,
    firstName: String,
    lastName: String,
    photoURL: String,
    school: String,
    githubURL: String,
    resumeURL: String,
    phoneNum: String,
    checkedIn: Boolean,
    ateBreakfast: Boolean,
    ateLunch: Boolean,
    ateDinner: Boolean,
  },
});

// generate a hash
userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

// check if pw is valid
userSchema.methods.validPassword = password => bcrypt.compareSync(password, this.local.password);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
