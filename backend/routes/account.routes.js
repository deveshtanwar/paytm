const express = require('express');
const controller = require('../controller/balance.controller');
const auth = require('../middleware/auth');
const { transferValidate } = require('../middleware/transferValidation');

const router = express.Router();

router.get('/index', (req, res) => {
    res.send("account routes working fine");
})

router.get('/getBalance', auth, controller.getBalance);
router.post('/transfer', auth, transferValidate, controller.transferAmount);


module.exports = router;