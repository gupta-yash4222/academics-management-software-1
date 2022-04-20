const mongoose = require('mongoose');

var CalendarEventSchema = new mongoose.Schema(
    {
        title: String,
        startDate: String,
        endDate: String,
        startTime: String,
        endTime: String, 
        daysOfWeek: {
            type: [Number], 
            default: []
        },
        repeatWeekly: {
            type: Boolean,
            default: false
        },
        addReminder: {
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