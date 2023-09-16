const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    price: Number,
    quantity: Number,
});

const ProductModel = mongoose.model('Product',ProductSchema);
module.exports = ProductModel;
