var User = require('../models/User');
/*
 |-----------------------------------------------------------
 | GET /api/me
 |-----------------------------------------------------------
 */
exports.getCurrentUser = function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
};

/*
 |-----------------------------------------------------------
 | PUT /api/me
 |-----------------------------------------------------------
 */
exports.putCurrentUser = function(req, res) {
  User.findById(req.user, function(err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.profile.name = req.body.name || user.profile.name;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.status(200).end();
    });
  });
};

/*
 |-----------------------------------------------------------
 | ADMIN PANEL
 |-----------------------------------------------------------
 */
 exports.getUsers = function(req, res){
   User.find().exec(function(err, users){
     if(err) res.end("Error in get users");
     res.send(users);
   });
 };

exports.updateUser = function(req, res){
  User.findById(req.query.userId).exec(function(err, user){
    if(err) res.end("Error in update User");
    user.email = req.body.email;
    user.password = req.body.password;
    user.profile = {
      name: req.body.name,
      gender: req.body.gender,
      location: req.body.location,
      website: req.body.website,
      picture: req.body.picture
    }
    user.save(function(err, user){
      if(err) return err;
      res.send(user);
    });
  });
};

exports.deleteUser = function(req, res){
  User.remove(req.query.userId).exec(function(err, user){
    if(err) res.end("Error in update User");
    res.send("User removed successfully");
  });
};

exports.createUser = function(req, res){
  var user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name,
      gender: req.body.gender,
      location: req.body.location,
      website: req.body.website,
      picture: req.body.picture
    }
  });
  user.save(function(err, user){
    if(err) return err;
    res.send(user);
  });
};
