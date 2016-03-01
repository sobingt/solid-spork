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
    var date = new Date(req.query.date);
    var nextDate = new Date(date);
    nextDate.setDate(date.getDate()+1);
    query.where({ date: {"$gte": date, "$lt": nextDate}});
    console.log(req.query.date);

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
/*
 |-----------------------------------------------------------
 | ADMIN PANEL
 |-----------------------------------------------------------
 */
 exports.getAllMenus = function(req, res){
   Menu.find().exec(function(err, menus){
     if(err) return err;
     res.send(menus);
   });
 };

 exports.updateMenu = function(req, res){
    Menu.findById(req.query.menuId).exec(function(err, menu){
      if(err) return err;
      if(!menu) res.end("menu not found");
      menu.name = req.body.name || menu.name;
      menu.type = req.body.type || menu.type;
      menu.description = req.body.description || menu.description;
      menu.category = req.body.category || menu.category;
      var userValue = req.body.value;
      var found = false;
      for(var i=0;i<menu.portions.length;i++){
        if(menu.portions[i]["value"] == userValue){
          found = true;
          menu.portions[i]["cost"] = req.body.cost || menu.portions[i]["cost"];
          menu.portions[i]["container"] = req.body.container || menu.portions[i]["container"];
        }
      }
      if(!found){
        var portions = {
          "value" : userValue,
          "cost" : req.body.cost,
          "container": req.body.container,
        }
        menu.portions.push(portions);
      }
      menu.date = req.body.date || menu.date;
      menu.image = req.body.image || menu.image;
      menu.chef = {
        name: req.body.chefName,
        image: req.body.chefImage
      }
      menu.save(function(err, menus){
       if(err) return err;
       res.send(menus);
     });
   });
 };

 exports.createMenu = function(req, res){
   var menu = new Menu({
     name: req.body.name,
     type: req.body.type,
     description: req.body.description,
     category: req.body.category,
     portions: {
        "value" : req.body.value,
        "cost" : req.body.cost,
        "container": req.body.container,
     },
     date: req.body.date,
     image: req.body.image,
     chef: {
       name: req.body.chefName,
       image: req.body.chefImage
     }
   });
   menu.save(function(err, menu){
     if(err) return err;
     res.send(menu);
   });
 };

 exports.deleteMenu = function(req, res){
   Menu.remove(req.query.menuId).exec(function(err, menu){
     if(err) return err;
     res.send("Menu deleted successfully");
   });
 };
