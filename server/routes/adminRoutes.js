const express = require('express');
const { getAllCoordinates } = require('../Controllers/getAllCoordinates');
const router = express.Router();



router.get("/getAllCooridnates",getAllCoordinates);
module.exports = router;