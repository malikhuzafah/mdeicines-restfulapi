var express = require("express");
let router = express.Router();
var Order = require("../../models/order");
var auth = require("../../middlewares/auth");

router.get("/", auth, async (req, res) => {
  let orders = await Order.find({ id: req.user._id });
  return res.send(orders);
});

router.get("/:id", auth, async (req, res) => {
  let order = await Order.findbyId(req.params.id);
  return res.send(order);
});

router.post("/", auth, async (req, res) => {
  var order = new Order(req.body);
  await order.save();
  return res.send(order);
});

router.delete("/:id", auth, async (req, res) => {
  var order = await Order.findbyIdAndDelete(req.params.id);
  return res.send(order);
});

router.put("/:id", auth, async (req, res) => {
  var order = Order.findbyId(req.params.id);
  order.products = req.body.products;
  order.total = req.body.total;
  order.save();
  return res.send(order);
});

module.exports = router;
