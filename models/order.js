var mongoose = require("mongoose");

var orderScheme = mongoose.Schema({
  userId: String,
  products: [String],
  total: Number,
});

var Order = mongoose.model("Order", orderScheme);
module.exports = Order;
