var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
  createdOn : Date,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  item: [
      {
        _id: type: mongoose.Schema.Types.ObjectId, ref: 'Menu',
        selectedSubCategory : Array
      }
  ],
};

module.exports = mongoose.model('Cart', cartSchema);