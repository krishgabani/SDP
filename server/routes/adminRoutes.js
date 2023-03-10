const express = require('express');
const { getAllCoordinates } = require('../Controllers/userControllers/getAllCoordinates');
const { getAllfacultyById } = require('../Controllers/userControllers/getAllfacultyById')
const router = express.Router();


router.post("/getAllfacultyById", getAllfacultyById);

router.get("/getAllCooridnates", getAllCoordinates);

module.exports = router;