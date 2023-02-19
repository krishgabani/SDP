const express = require('express');
const router = express.Router();
const {sendjournal} = require('../Controllers/sendJournal.js')
const {sendconference} = require('../Controllers/sendconference.js')
const {getjournal} = require('../Controllers/getjournal.js')
const {sendtodb} = require('../Controllers/sendDataroute')
const {editjournal} = require('../Controllers/editjournal')

router.post("/sendjournal",sendjournal);

router.post("/getjournal",getjournal);

router.post("/sendconference",sendconference);

router.post("/senddata", sendtodb);

router.post("/editjournal",editjournal);

module.exports = router;
  