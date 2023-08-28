const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try{
        // get infor client
        const username = req.body.new_username;
        const email = req.body.new_email;
        const password = req.body.new_password;

        // creat data to database
        await userModel.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password,10),
        role: 'customer'
        });
        return res.status(200).send('register user');
    }
    catch(error){
        return res.status(400).send('error');
    }
}

const login = async (req, res)=>{
    //check user
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Invalid Email or Password');
    }
    //check pass
    const isPassvalid = bcrypt.compareSync(req.body.password, user.password);
    if(!isPassvalid){
        return res.status(400).send('Invalid Email or Password');
    }
    const jwtToken = jwt.sign({
        _id:user.id,
        username: user.username,
        role:user.role
    }, process.env.SECRET_JWT   ,{
        expiresIn: 3600
    });
    return res.status(200).send({
        accessToken: jwtToken
    });
}


module.exports = {
    register: register,
    login: login
};