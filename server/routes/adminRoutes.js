const express = require('express');
const { getAllCoordinates} = require('../Controllers/getAllCoordinates');
const { getAllfacultyById } = require('../Controllers/getAllfacultyById')
const router = express.Router();


router.post("/getAllfacultyById",getAllfacultyById);

router.get("/getAllCooridnates",getAllCoordinates);

module.exports = router;