const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/ProductController');
const authMiddleware = require('../Middleware/AuthMiddleware');

// Đăng ký route để lấy danh sách Product của người dùng
router.get('/products',[
    authMiddleware.isAuthentication
], ProductController.getList);

// Đăng ký route để tạo Product mới
router.post('/products/create',[
    authMiddleware.isAuthentication
], ProductController.createProduct);

// Đăng ký route để xóa Product
router.delete('/products/delete/:productId',[
    authMiddleware.isAuthentication
], ProductController.deleteProduct);

router.delete('/products/deleteAll',[
    authMiddleware.isAuthentication
], ProductController.deleteAll);

// Đăng ký route để cập nhật số lượng 
router.put('/products/update/:productId',[
    authMiddleware.isAuthentication
], ProductController.updateProduct);

module.exports = router;
