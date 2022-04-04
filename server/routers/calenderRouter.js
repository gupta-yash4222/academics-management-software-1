const express = require('express');

const {apiCreateEvent, apiGetAllEvents} = require('../api/calenderController.js');

var router = express.Router();

router.post('/addEvent', apiCreateEvent);
router.get('/', apiGetAllEvents);

module.exports = router;