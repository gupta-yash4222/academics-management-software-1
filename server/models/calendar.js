const mongoose = require('mongoose');

var CalendarEventSchema = new mongoose.Schema(
    {
        title: String,
        startDate: String,
        endDate: String,
        startTime: String,
        endTime: String, 
        repeatWeekly: {
            type: Boolean,
            default: false
        },
        content: String 
    },
    {
        toJSON: { virtuals: true }
    }
);

var UserCalendarSchema = new mongoose.Schema(
    {
        username: String,
        events: {
            type: [CalendarEventSchema],
            default: []
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

var CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);
var UserCalendar = mongoose.model('UserCalendar', UserCalendarSchema);

module.exports = {CalendarEvent, UserCalendar};