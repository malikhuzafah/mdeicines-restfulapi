var express = require("express");
const CartItem = require("../../models/cartItem");
let router = express.Router();

router.get("/:userId", async (req, res) => {
  let cartItems = await CartItem.find({ userId: req.params.userId });
  return res.send(cartItems);
});

router.delete("/:id", async (req, res) => {
  let cartItem = await CartItem.findByIdAndDelete(req.params.id);
  return res.send(cartItem);
});

router.put("/:id", async (req, res) => {
  let cartItem = await CartItem.findById(req.params.id);
  cartItem.quantity = req.body.quantity;
  cartItem.save();
  return res.send(cartItem);
});

router.post("/", async (req, res) => {
  let cartItem = new CartItem(req.body);
  await cartItem.save();
  return res.send(cartItem);
});

module.exports = router;
