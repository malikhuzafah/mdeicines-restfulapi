const express = require("express");
let router = express.Router();
const validateMedicine = require("../../middlewares/validateMedicine");
const auth = require("../../middlewares/auth");
var { Medicine } = require("../../models/medicine");
const admin = require("../../middlewares/admin");

router.get("/", async (req, res) => {
  let medicines = await Medicine.find();
  return res.send(medicines);
});

router.get("/:id", async (req, res) => {
  try {
    let medicine = await Medicine.findById(req.params.id);
    if (!medicine)
      return res.status(400).send("Medicine with given id ID not present");
    return res.send(medicine);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

router.put("/:id", auth, admin, async (req, res) => {
  let medicine = await Medicine.findById(req.params.id);
  medicine.name = req.body.name;
  medicine.price = req.body.price;
  medicine.quantity = req.body.quantity;
  await medicine.save();
  return res.send(medicine);
});

router.delete("/:id", auth, admin, async (req, res) => {
  let medicine = await Medicine.findByIdAndDelete(req.params.id);
  return res.send(medicine);
});

router.post("/", auth, admin, validateMedicine, async (req, res) => {
  var medicine = new Medicine(req.body);
  await medicine.save();
  return res.send(medicine);
});

module.exports = router;
