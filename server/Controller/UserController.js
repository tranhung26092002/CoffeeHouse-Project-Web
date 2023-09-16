const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../Models/UserModel');
const billModel = require('../Models/BillModel');
const productModel = require('../Models/ProductModel');


const getInfor = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);

        return res.status(200).send(user);
    } catch (error) {
        // log error
    }
}


const updateInfor = async (req, res) => {
    try {
        // update user
        const userId = req.params.userId;
        const { username, email, password, new_password } = req.body;

        const user = await userModel.findById(userId);
        const isOldPasswordValid = bcrypt.compareSync(password, user.password);
        
        if (!isOldPasswordValid) {
            return res.status(400).send('Mật khẩu cũ không đúng');
        }
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            username: username,
            email: email,
            password: bcrypt.hashSync(new_password,10), // Cập nhật mật khẩu mới
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

const createBill = async (req, res) => {
    try {
        const bearerHeader = req.headers['authorization'];
        const accessToken = bearerHeader.split(' ')[1];
        const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
        const userId = decodeJwt._id; // Lấy userId từ token

        const userProducts = await productModel.find({ userId: userId });
        const user = await userModel.findById(userId);

        // Lấy thông tin từ client (số điện thoại, địa chỉ, mã giảm giá)
        const {phoneNumber, address, discountCode, paymentMethod, deliverytMethod} = req.body;
    
        // Tính tổng giá trị hóa đơn từ danh sách sản phẩm
        const totalAmount = userProducts.reduce((total, product) => total + (product.price * product.quantity), 0);

        // Tạo hóa đơn
        const newBill = await billModel.create({
            userId: userId, // Sử dụng userId của người dùng
            name: user.username,
            email: user.email,
            products: userProducts, // Sử dụng danh sách sản phẩm của người dùng
            totalAmount: totalAmount, // Tổng giá trị hóa đơn
            phoneNumber: phoneNumber, // Số điện thoại từ client
            address: address, // Địa chỉ từ client
            discountCode: discountCode, // Mã giảm giá từ client
            paymentMethod: paymentMethod,
            deliverytMethod: deliverytMethod,
        });
        // Trả về kết quả cho client
        res.status(200).send({ message: 'Hóa đơn đã được tạo thành công', newBill });
    } catch (error) {
        console.error('Lỗi khi tạo hóa đơn:', error);
        res.status(500).send({ error: 'Đã xảy ra lỗi khi tạo hóa đơn' });
    }
}

module.exports = {
    getInfor: getInfor,
    updateInfor: updateInfor,
    createBill: createBill,
}