const express = require('express');
const router = express.Router();
const {sendjournal} = require('../Controllers/sendJournal.js')
const {sendconference} = require('../Controllers/sendconference.js')
const {getjournal} = require('../Controllers/getjournal.js')
const {getconference} = require('../Controllers/getconference.js')
const {sendtodb} = require('../Controllers/sendDataroute')
const {editjournal} = require('../Controllers/editjournal')
const {editconference} = require('../Controllers/editconference')

router.post("/sendjournal",sendjournal);
router.post("/getjournal",getjournal);
router.post("/editjournal",editjournal);

router.post("/sendconference",sendconference);
router.post("/getconference",getconference);
router.post("/editconference",editconference);


router.post("/senddata", sendtodb);



module.exports = router;
  