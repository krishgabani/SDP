const express = require('express');
const router = express.Router();
const {registerUser} = require('../Controllers/registerUser')
const {ownVerify} = require('../Controllers/ownVerify');
const { adminVerify } = require('../Controllers/adminVerify');
const { loginUser } = require('../Controllers/loginUser');
const { authController } = require('../Controllers/userController');
const authMiddlewar = require('../middlerwares/authMiddlewar');
const {editDepartment} = require('../Controllers/editDepartment')


router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/:id/verify/:token/',ownVerify)

router.get('/:id/adminverify/:token/',adminVerify);

router.get('/getUserData',authMiddlewar,authController)

router.post('/editdepartment',editDepartment);

module.exports = router;