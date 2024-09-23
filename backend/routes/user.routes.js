const express = require('express');
const controller = require('../controller/user.controller');
const { validateUser, validateLoginUser, validateProfile } = require('../middleware/userValidation');
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/index', (req, res) => {
    res.send("user routes working fine")
})

router.get('/verifyToken', auth, controller.verifyToken)
router.post('/register', validateUser, controller.register);
router.post('/login', validateLoginUser, controller.verify);
router.put('/profile', auth, validateProfile, controller.updateProfile);
router.get('/bulk', auth, controller.getUsers)
router.get('/userById/:Id', auth, controller.getUserById)


module.exports = router;