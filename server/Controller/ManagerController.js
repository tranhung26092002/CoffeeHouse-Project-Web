const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const productModel = require('../Models/ProductModel');
const userModel = require('../Models/UserModel');

const getListCustomer = async (req, res) => {
    try {
        // Sử dụng truy vấn MongoDB để lấy danh sách người dùng có role là "customer"
        const users = await userModel.find({ role: "customer" });

        return res.status(200).send(users);
    } catch (error) {
        // Xử lý lỗi
    }
}


const getProducts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);

        const products = await productModel.find({ userId: user._id });
        return res.status(200).send(products);
    } catch (error) {
        // log error
    }
}

const deleteUser = async (req, res) => {
    try {
        // delete user
        const userId = req.params.userId;
        await userModel.findByIdAndRemove(userId);
        return res.status(200).send('delete user success');
    } catch (error) {
        // log error
    } 
}


module.exports = {
    getListCustomer:    getListCustomer,
    getProducts:        getProducts,
    deleteUser:     deleteUser,
}