const express = require('express');
const { getAllCoordinates } = require('../Controllers/userControllers/getAllCoordinates');
const { getAllfacultyById } = require('../Controllers/userControllers/getAllfacultyById');
const {deleteDepartment } = require('../Controllers/departmentController/deleteDepartment');
const {deleteCoordinator} = require('../Controllers/adminController/deleteCoordinator');
const {deleteFaculty} = require('../Controllers/adminController/deleteFaculty');
const {getAllyears} = require('../Controllers/adminController/getAllyears')
const {addYears} = require('../Controllers/adminController/addYears')
const authMiddlewar = require('../middlerwares/authMiddlewar');
const {protect} = require('../middlerwares/userMiddlerwar')
const router = express.Router();

router.post("/getAllfacultyById", getAllfacultyById);

router.get("/getAllCooridnates", getAllCoordinates);

router.put("/deletedepartment",deleteDepartment);

router.put("/deleteCoordinator",deleteCoordinator);

router.put("/deleteFaculty",deleteFaculty);

router.get("/years",protect,getAllyears);

router.post("/addnewyear",protect,addYears);

module.exports = router;