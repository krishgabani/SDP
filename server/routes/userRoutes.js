const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/userControllers/registerUser')
const { ownVerify } = require('../Controllers/userControllers/ownVerify');
const { adminVerify } = require('../Controllers/adminController/adminVerify');
const { loginUser } = require('../Controllers/userControllers/loginUser');
const { authController } = require('../Controllers/userControllers/userController');
const authMiddlewar = require('../middlerwares/authMiddlewar');
const { editDepartment } = require('../Controllers/departmentController/editDepartment')
const { getDepartment } = require('../Controllers/departmentController/getDepartment');
const { updateProfile } = require('../Controllers/userControllers/updateProfile');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/:id/verify/:token/', ownVerify)

router.get('/:id/adminverify/:token/', adminVerify);

router.get('/getUserData', authMiddlewar, authController)

router.post('/editdepartment', editDepartment);

router.post('/getdepartment', getDepartment);

router.put('/updateprofile',updateProfile);



module.exports = router;