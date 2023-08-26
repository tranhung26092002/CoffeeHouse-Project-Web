const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/ProductController');
const authMiddleware = require('../Middleware/AuthMiddleware');

// Đăng ký route để lấy danh sách tasks của người dùng
router.get('/products',[
    authMiddleware.isAuthentication
], ProductController.getList);

// Đăng ký route để tạo task mới
router.post('/products/create',[
    authMiddleware.isAuthentication
], ProductController.createProduct);

// Đăng ký route để xóa task
router.delete('/products/delete/:productId',[
    authMiddleware.isAuthentication
], ProductController.deleteProduct);


module.exports = router;
