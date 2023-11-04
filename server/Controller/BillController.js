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

    // Kiểm tra xem danh sách sản phẩm của người dùng có rỗng không
    const userProducts = await productModel.find({ userId: userId });
    if (userProducts.length === 0) {
      return res.status(400).send({ error: "Không có sản phẩm để tạo hóa đơn." });
    }

    const user = await userModel.findById(userId);

    // Lấy thông tin từ client (số điện thoại, địa chỉ, mã giảm giá)
    const {
      phoneNumber,
      address,
      discountCode,
      paymentMethod,
      deliveryMethod,
    } = req.body;

    // Tạo danh sách chi tiết sản phẩm
    const productsDetails = userProducts.map((product) => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }));

    // Tính tổng giá trị hóa đơn từ danh sách sản phẩm
    const totalAmount = productsDetails.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    // Tạo hóa đơn
    const newBill = await billModel.create({
      userId: userId, // Sử dụng userId của người dùng
      name: user.username,
      email: user.email,
      products: productsDetails, // Sử dụng danh sách chi tiết sản phẩm
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


const deleteAll = async (req, res) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id;

    // Tìm tất cả sản phẩm của người dùng dựa trên userId
    await billModel.deleteMany({ userId: userId });
    return res.status(200).send('delete bills success');
  } catch (error) {
      // log error
    return res.status(500).send({ error: 'Lỗi khi xóa sản phẩm.' });
  } 
}



module.exports = {
  getListBill: getListBill,
  createBill: createBill,
  deleteAll: deleteAll,
};
