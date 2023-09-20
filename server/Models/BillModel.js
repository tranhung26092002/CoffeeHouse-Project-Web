const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm trong hóa đơn
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// Định nghĩa schema cho hóa đơn
const billSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu đến schema của người dùng nếu cần
  },
  name: String,
  email: String,
  products: [productSchema], // Sử dụng schema sản phẩm ở trên
  totalAmount: Number,
  address: String,
  phoneNumber: String,
  discountCode: String,
  paymentMethod: String,
  deliveryMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
