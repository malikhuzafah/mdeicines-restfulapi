var mongoose = require("mongoose");

var cartItemSchema = mongoose.Schema({
  userId: String,
  product: String,
  quantity: Number,
  total: Number,
});

var CartItem = mongoose.model("Cart", cartItemSchema);
module.exports = CartItem;
