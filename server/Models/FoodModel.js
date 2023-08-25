const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    food:{
        name: {
            type: String,
            unique: true,
        },
        price: String,
    },
});

const FoodModel = mongoose.model('Food',FoodSchema);
module.exports = FoodModel;
