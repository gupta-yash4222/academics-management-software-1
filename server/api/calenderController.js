const { insertEvent, getAllEvents } = require('../dao/CalenderDAO.js');

function apiCreateEvent(req, res){

}

function apiGetAllEvents(req, res){
    req.body.rollNo = 180639;
    var rollNo = req.body.rollNo;

    getAllEvents(rollNo)
    .then( (result) => {
        return res.status(result.status).json({message: result.message, events: result.events});
    })
    .catch( (error) => {
        return res.status(error.status).json({message: error.message});
    });
}

module.exports = {apiCreateEvent, apiGetAllEvents};