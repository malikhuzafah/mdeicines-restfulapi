var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

var medicineSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String
});

var Medicine = mongoose.model("Medicine", medicineSchema);

function validateMedicine(data) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        price: Joi.number().min(0).required(),
        quantity: Joi.number().min(0).required(),
        description: Joi.string().min(3)
    });
    return schema.validate(data, {abortEarly:false});
}

module.exports.Medicine = Medicine;
module.exports.validate = validateMedicine;