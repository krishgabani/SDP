const express = require('express');
const router = express.Router();
const {registerUser} = require('../Controllers/registerUser')
const {owenVerify} = require('../Controllers/owenVerify');
const { adminVerify } = require('../Controllers/adminVerify');

router.post('/register',registerUser);

router.get('/:id/verify/:token/',owenVerify)

router.get('/:id/adminverify/:token/',adminVerify);

module.exports = router;