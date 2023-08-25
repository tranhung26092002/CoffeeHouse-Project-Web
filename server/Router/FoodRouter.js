const express = require('express');
const router = express.Router();
const FoodController = require('../Controller/FoodController');
const authMiddleware = require('../Middleware/AuthMiddleware');

// Đăng ký route để lấy danh sách tasks của người dùng
router.get('/foods',[
    authMiddleware.isAuthentication
], FoodController.getListTask);

// Đăng ký route để tạo task mới
router.post('/foods/create',[
    authMiddleware.isAuthentication
], FoodController.createTask);

// Đăng ký route để xóa task
router.delete('/foods/delete/:taskId',[
    authMiddleware.isAuthentication
], FoodController.deleteTask);



module.exports = router;
