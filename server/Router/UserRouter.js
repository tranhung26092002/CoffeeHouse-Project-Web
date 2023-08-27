// create put update delete
const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const authMiddleware = require('../Middleware/AuthMiddleware');


router.get('/users',[
    authMiddleware.isAuthentication
], userController.getListUser);

router.get('/users/user/:userId',[
    authMiddleware.isAuthentication,
], userController.getUser);

router.post('/users/create', [
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin
],userController.postUser);

router.delete('/users/delete/:userId', [
    authMiddleware.isAuthentication,
    authMiddleware.isAdmin
],userController.deleteUser);

router.put('/users/update/:userId', [
    authMiddleware.isAuthentication,
],userController.updateUser);

module.exports = router;