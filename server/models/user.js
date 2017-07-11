const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {type: String, index: {unique: true, required: true, dropDups: true, lowercase: true}},
  password: String
});

//On save hook, encrypt password
//Before saving a model, run this function
userSchema.pre('save', function(next) {
  //get access of the user model
  const user = this;

  //generat a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {return next(err);}

    //hash our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {return next(err);}

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(submitedPassword, cb) {
  bcrypt.compare(submitedPassword, this.password, function(err, isMatch) {
    if(err) {return cb(err);}

    cb(null, isMatch);
  });
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
