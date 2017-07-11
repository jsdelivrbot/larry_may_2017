const User = require('../models/user');
const config = require('../config');
const jwt = require('jwt-simple');

//create a jwt for a user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.getUser = function(req, res, next) {
  User.findOne({_id: req.user.id}, function(err, user) {
    if(err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
}

exports.signin = function(req, res, next) {
  //User has already had their email and password auth'd
  //we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}
//export sign-up functionality to router
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  User.findOne({email: email}, function(err, existingUser) {
    if(err) {return next(err);}

    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
    }

    const newUser = {email: email, password: password};
    User.create(newUser, function(err, newlyCreatedUser) {
      if(err) {
        return next(err);
      } else {
        res.json({token: tokenForUser(newlyCreatedUser)});
      }
    });
  });
}
