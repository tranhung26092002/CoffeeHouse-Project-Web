const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu đến schema của người dùng nếu cần
  },
  name: String,
  email: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Tham chiếu đến module sản phẩm
    },
  ],
  totalAmount: Number,
  address: String,
  phoneNumber: String,
  discountCode: String,
  paymentMethod: String,
  deliverytMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;
