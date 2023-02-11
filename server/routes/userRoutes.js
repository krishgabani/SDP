const express = require('express');
const router = express.Router();
const {registerUser} = require('../Controllers/registerUser')
const {owenVerify} = require('../Controllers/owenVerify')

router.post('/register',registerUser);

router.get('/:id/verify/:token/',owenVerify)

module.exports = router;