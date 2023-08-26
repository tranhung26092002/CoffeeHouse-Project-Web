const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        unique: true // Đánh dấu trường name là duy nhất
    },
    price: Number,
});

const ProductModel = mongoose.model('Product',ProductSchema);
module.exports = ProductModel;
