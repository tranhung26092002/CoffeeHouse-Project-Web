const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../Models/UserModel');

const getListUser = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send(users);
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
        await userModel.findByIdAndRemove(userId);
        return res.status(200).send('delete user success');
    } catch (error) {
        // log error
    } 
}

module.exports = {
    getListUser: getListUser,
    postUser: postUser,
    deleteUser: deleteUser
}