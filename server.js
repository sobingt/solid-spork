var path = require('path');

var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var colors = require('colors');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');


var secret = require('./config/secrets');
var config = new secret();

var authController = require('./controllers/auth');
var userController = require('./controllers/user');
var menuController = require('./controllers/menu');

mongoose.connect(config.db);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

var app = express();

app.set('port', process.env.PORT || config.port);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}
app.use(express.static(path.join(__dirname, 'public')));

/*
 |-----------------------------------------------------------
 | Route for Menu
 |-----------------------------------------------------------
 */
app.get('/api/menus', menuController.getMenus);
app.get('/api/menus/:id', menuController.getMenuById);
/*
 |-----------------------------------------------------------
 | Route for CurrentUser
 |--------------------/api/menus/:date---------------------------------------
 */
app.get('/api/me', authController.ensureAuthenticated, userController.getCurrentUser);
app.put('/api/me', authController.ensureAuthenticated, userController.putCurrentUser);
/*
 |-----------------------------------------------------------
 | Route for Auth
 |-----------------------------------------------------------
 */
app.post('/auth/login', authController.postLogin);
app.post('/auth/signup', authController.postSignUp);
app.post('/auth/google', authController.postGoogleLogin);
app.post('/auth/github', authController.postGithubLogin);
app.post('/auth/linkedin', authController.postLinkedinLogin);
app.post('/auth/facebook', authController.postFacebookLogin);
app.post('/auth/twitter', authController.postTwitterLogin);
app.post('/auth/foursquare', authController.postFoursquareLogin);
app.post('/auth/unlink/:provider', authController.ensureAuthenticated, authController.getUnlinkAuth);
/*
 |-----------------------------------------------------------
 | ADMIN PANEL
 |--------------------/admin---------------------------------
 */
 app.get('/admin/getUsers', userController.getUsers);
 app.post('/admin/updateUser', userController.updateUser);
 app.post('/admin/deleteUser', userController.deleteUser);
 app.post('/admin/createUser', userController.createUser);
 //menu
 app.get('/admin/getMenus', menuController.getAllMenus);
 app.post('/admin/updateMenu', menuController.updateMenu);
 app.post('/admin/deleteMenu', menuController.deleteMenu);
 app.post('/admin/createMenu', menuController.createMenu);
/*
 |-----------------------------------------------------------
 | Start the Server
 |-----------------------------------------------------------
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
