const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");
const billModel = require("../Models/BillModel");
const productModel = require("../Models/ProductModel");


const getListBill = async (req, res) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const accessToken = bearerHeader.split(" ")[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id;

    const bills = await billModel.find({ userId: userId });
    return res.status(200).send(bills);
  } catch (error) {
    // log error
  }
};

const createBill = async (req, res) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const accessToken = bearerHeader.split(" ")[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id; // Lấy userId từ token

    const userProducts = await productModel.find({ userId: userId });
    const user = await userModel.findById(userId);

    // Lấy thông tin từ client (số điện thoại, địa chỉ, mã giảm giá)
    const {
      phoneNumber,
      address,
      discountCode,
      paymentMethod,
      deliveryMethod,
    } = req.body;

    // Tính tổng giá trị hóa đơn từ danh sách sản phẩm
    const totalAmount = userProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

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
      deliveryMethod: deliveryMethod,
    });
    // Trả về kết quả cho client
    res.status(200).send(newBill);
  } catch (error) {
    console.error("Lỗi khi tạo hóa đơn:", error);
    res.status(500).send({ error: "Đã xảy ra lỗi khi tạo hóa đơn" });
  }
};

module.exports = {
  getListBill: getListBill,
  createBill: createBill,
};
