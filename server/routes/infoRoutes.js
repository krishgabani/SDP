const express = require('express');
const router = express.Router();
const { sendjournal } = require('../Controllers/journalController/sendJournal')
const { addjournal } = require('../Controllers/journalController/addjournal')
const { sendconference } = require('../Controllers/conferenceController/sendconference')
const { getjournal } = require('../Controllers/journalController/getjournal.js')
const { getconference } = require('../Controllers/conferenceController/getconference.js')
const { sendtodb } = require('../Controllers/sendDataroute')
const { editjournal } = require('../Controllers/journalController/editjournal')
const { editconference } = require('../Controllers/conferenceController/editconference')
const { getfacultynames } = require('../Controllers/userControllers/getfacultynames')
const { getyearslist } = require('../Controllers/journalController/getyearslist')
const { getdoilist } = require('../Controllers/journalController/getdoilist')
const {getApiData} = require('../Controllers/journalController/getApiData')
const {deletejournal} = require('../Controllers/journalController/deletejournal')
const {deleteconference} = require('../Controllers/conferenceController/deleteconference')
const {authMiddlerwar} = require('../middlerwares/authMiddlewar');
const { addConference } = require('../Controllers/conferenceController/addConference');

router.post("/sendjournal", sendjournal);
router.post("/addjournal", addjournal);
router.post("/getjournal", getjournal);
router.post("/editjournal", editjournal);

router.post("/sendconference", sendconference);
router.post("/getconference", getconference);
router.post("/editconference", editconference);
router.post("/addconference",addConference)

router.post("/getfacultynames", getfacultynames);
router.post("/getyearslist", getyearslist);
router.post("/getdoilist", getdoilist);

router.post("/deletjournal",deletejournal);
router.post("/deleteconference",deleteconference);

router.post("/senddata", sendtodb);

router.post("/getapiData",getApiData);



module.exports = router;
