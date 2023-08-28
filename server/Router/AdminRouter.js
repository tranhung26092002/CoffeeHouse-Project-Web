const express = require('express');
const router = express.Router();
const adminController = require('../Controller/AdminController');
const authMiddleware = require('../Middleware/AuthMiddleware');


router.get('/users',[
    authMiddleware.isAuthentication
], adminController.getListUser);

router.get('/users/user/:userId',[
    authMiddleware.isAuthentication,
], adminController.getUser);

router.post('/users/create', [
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin
],adminController.postUser);

router.delete('/users/delete/:userId', [
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin
],adminController.deleteUser);

router.put('/users/update/:userId', [
    authMiddleware.isAuthentication,
],adminController.updateUser);

module.exports = router;