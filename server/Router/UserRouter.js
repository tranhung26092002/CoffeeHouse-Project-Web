// create put update delete
const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const authMiddleware = require('../Middleware/AuthMiddleware');



router.get('/:userId',[
    authMiddleware.isAuthentication,
], userController.getInfor);

router.put('/update/:userId', [
    authMiddleware.isAuthentication,
],userController.updateInfor);

module.exports = router;