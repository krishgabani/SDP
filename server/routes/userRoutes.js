const express = require('express');
const router = express.Router();
const {registerUser} = require('../Controllers/registerUser')
const {ownVerify} = require('../Controllers/ownVerify');
const { adminVerify } = require('../Controllers/adminVerify');
const { loginUser } = require('../Controllers/loginUser');
const { authController } = require('../Controllers/userController');
const authMiddlewar = require('../middlerwares/authMiddlewar');


router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/:id/verify/:token/',ownVerify)

router.get('/:id/adminverify/:token/',adminVerify);

router.get('/getUserData',authMiddlewar,authController)

module.exports = router;