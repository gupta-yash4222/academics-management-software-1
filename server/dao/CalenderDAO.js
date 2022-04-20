const Event = require('../models/event.js');
const {CalendarEvent, UserCalendar} = require('../models/calendar.js')

async function insertEvent(eventDict) {
    return new Promise( (resolve, reject) => {
        const event = new CalendarEvent({
            title: eventDict.title,
            startDate: eventDict.startDate,
            endDate: eventDict.endDate,
            startTime: eventDict.startTime,
            endTime: eventDict.endTime, 
            daysOfWeek: eventDict.daysOfWeek,
            repeatWeekly: eventDict.repeatWeekly,
            addReminder: eventDict.addReminder,
            content: eventDict.content 
        });

        event.save();

        UserCalendar.findOne({ username: eventDict.username }, (err, calendar) => {
            if(err) return reject({status: 500, message: "Internal server error"});
            else if (!calendar) {
                const calendar = new UserCalendar({
                    username: eventDict.username
                });
                calendar.events.push(event); calendar.save();
            }
            else {
                calendar.events.push(event); calendar.save();
            }
            return resolve({status: 200, message: "Event added successfully"});
        });

    });
}

async function getAllEvents(username) {
    return new Promise( (resolve, reject) => {

        UserCalendar.findOne({ username: username }, (err, calendar) => {
            if(err) return reject({status: 500, message: "Internal server error"});
            else if(!calendar) {
                return resolve({status: 204, message: "No event to fetch", events: []});
            }
            else {
                var events = []
                for(var i = 0; i < calendar.events.length; ++i) {
                    var event = {
                        title: calendar.events[i].title,
                        startDate: calendar.events[i].startDate,
                        endDate: calendar.events[i].endDate,
                        startTime: calendar.events[i].startTime,
                        endTime: calendar.events[i].endTime,
                        daysOfWeek: calendar.events[i].daysOfWeek,
                        repeatWeekly: calendar.events[i].repeatWeekly,
                        addReminder: calendar.events[i].addReminder,
                        content: calendar.events[i].content
                    };
                    events.push(event);
                }
                return resolve({status: 200, message: "Fetched all events successfully", events: events});
            }
        });

    });
}

async function deleteEvent (username, eventID) {
    return new Promise( (resolve, reject) => {
        UserCalendar.findOne({ username: username }, (err, calendar) => {
            if(err) return reject({status: 500, message: "Internal server error"});
            else if(!calendar) {
                return reject({status: 204, message: "No calendar exists for the user"});
            }
            else {
                CalendarEvent.findOneAndDelete({ _id: eventID }, (err, event) => {
                  if(err) return reject({status: 500, message: "Internal server error"});
                  else if(!event) return reject({status: 400, message: "Invalid event id"});
                  else {
                    return resolve({status: 200, message: "Event successfully deleted"});
                  }
              });              
                calendar.events = calendar.events.filter(event => (event._id === eventID));
                calendar.save();
            }
        });
    })
}

module.exports = { insertEvent, getAllEvents, deleteEvent };
