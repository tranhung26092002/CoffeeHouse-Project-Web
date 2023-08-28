const express = require('express');
const router = express.Router();
const managerController = require('../Controller/ManagerController');
const authMiddleware = require('../Middleware/AuthMiddleware');


router.get('/users',[
    authMiddleware.isAuthentication,
    authMiddleware.isManager
], managerController.getListCustomer);

router.get('/users/products/:userId',[
    authMiddleware.isAuthentication,
    authMiddleware.isManager
], managerController.getProducts);

// router.post('/users/create', [
//     authMiddleware.isAuthentication,
//     authMiddleware.isManager
// ],managerController.postUser);

// router.delete('/users/delete/:userId', [
//     authMiddleware.isAuthentication,
//     authMiddleware.isManager
// ],managerController.deleteUser);

// router.put('/users/update/:userId', [
//     authMiddleware.isAuthentication,
//     authMiddleware.isManager
// ],managerController.updateUser);

module.exports = router;