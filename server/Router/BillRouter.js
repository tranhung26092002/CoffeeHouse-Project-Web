// create put update delete
const express = require('express');
const router = express.Router();
const billController = require('../Controller/BillController');
const authMiddleware = require('../Middleware/AuthMiddleware');


router.get('/list', [
    // authMiddleware.isAuthentication,
],billController.getListBill);

router.post('/create', [
    // authMiddleware.isAuthentication,
],billController.createBill);


// router.delete('/delete', [
//     // authMiddleware.isAuthentication,
// ],billController.deleteBill);

module.exports = router;