var mongoose = require('mongoose');

var deliverySchema = new mongoose.Schema({
  createdOn : Date,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  item: [
      {
        _id: type: mongoose.Schema.Types.ObjectId, ref: 'Menu',
        selectedSubCategory : Array
      }
  ],
  total: Number,
  subTotal: Number
};

module.exports = mongoose.model('Delivery', deliverySchema);