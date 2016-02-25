var Menu = require('../models/Menu');
var moment = require('moment');
var today = moment().startOf('day')

/*
 |-----------------------------------------------------------
 | GET /api/menus
 |-----------------------------------------------------------
 */
exports.getMenus = function(req, res, next) {
  var query = Menu.find();
  if (req.query.date) {
    query.where({ date: req.query.date });
  }
  if (req.query.category) {
    query.where({ category: req.query.category });
  }
  query.limit(12);
  query.exec(function(err, menus) {
    if (err) return next(err);
    res.send(menus);
  });
};

/*
 |-----------------------------------------------------------
 | GET /api/menus/:id
 |-----------------------------------------------------------
 */
exports.getMenuById = function(req, res, next) {
  Menu.findById(req.params.id, function(err, menu) {
    if (err) return next(err);
    res.send(menu);
  });
};


/*
 |-----------------------------------------------------------
 | PUT /api/menus
 |-----------------------------------------------------------
 */
exports.putMenu = function(req, res) {
  Menu.findById(req.menu, function(err, menu) {
    if (!menu) {
      return res.status(400).send({ message: 'Menu not found' });
    }
    menu.name = req.body.name || menu.name;
    menu.description = req.body.description || menu.description;
    menu.quantity = req.body.quantity || menu.quantity;
    menu.description = req.body.description || menu.description;
    menu.save(function(err) {
      res.status(200).end();
    });
  });
};

