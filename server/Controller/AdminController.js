const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../Models/UserModel');
const productModel = require('../Models/ProductModel');

const getListUser = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send(users);
    } catch (error) {
        // log error
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);

        return res.status(200).send(user);
    } catch (error) {
        // log error
    }
}

const postUser = (req, res) => {
    try {
        // save data
        const username = req.body.new_username;
        const email = req.body.new_email;
        const password = req.body.new_password;
        const role = req.body.role;

        userModel.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password,10),
            role: role
        });
        return res.status(200).send('create user success');
    } catch (error) {
        // log error
    } 
}

const deleteUser = async (req, res) => {
    try {
        // delete user
        const userId = req.params.userId;
        
        await productModel.deleteMany({ userId: userId });
        await userModel.findByIdAndRemove(userId);
        return res.status(200).send('delete user success');
    } catch (error) {
        // log error
    } 
}

const updateUser = async (req, res) => {
    try {
        // update user
        const userId = req.params.userId;
        const { username, email, password, new_password, role } = req.body;

        const user = await userModel.findById(userId);
        const isOldPasswordValid = bcrypt.compareSync(password, user.password);
        
        if (!isOldPasswordValid) {
            return res.status(400).send('Mật khẩu cũ không đúng');
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            username: username,
            email: email,
            password: bcrypt.hashSync(new_password,10), // Cập nhật mật khẩu mới
            role: role
        }, { new: true });

        if (updatedUser) {
            return res.status(200).send('Cập nhật thành công');
        } else {
            return res.status(500).send('Cập nhật không thành công');
        }            
    } catch (error) {
        // log error
        console.error(error);
        return res.status(500).send('Cập nhật không thành công');
    } 
}

module.exports = {
    getListUser:    getListUser,
    getUser:        getUser,
    postUser:       postUser,
    deleteUser:     deleteUser,
    updateUser:     updateUser,
}