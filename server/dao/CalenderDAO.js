const Event = require('../models/event.js');

function insertEvent(rollNo, title, courseID, content, tags) {
    //   return new Promise((resolve, reject) => {
    //     var note = new Note({
    //       rollNo: rollNo,
    //       title: title,
    //       courseId: courseID,
    //       content: content,
    //       tags: tags
    //     });
    //     note.save(function(err){
    //       if(err){
    //         reject({
    //           status: 400,
    //           response: "Note not inserted"
    //         });
    //       }
    //       else{
    //         resolve({
    //           status: 201,
    //           response: "Note successfully inserted"
    //         });
    //       }
    //     });
    //   });
}

function getAllEvents(currRollNo) {
    return new Promise((resolve, reject) => {
        Event.find({
          rollNo:currRollNo
        }, 
        function(err, events){
          if(err){
            reject({
              status: 500,
              response: "A server error occurred"
            });
          }
          else if(!events){
            reject({
              status: 404,
              response: "events not found"
            });
          }
          else{
            resolve({
              status: 202,
              message: "Success",
              events: events
            });
          }
        });
      });
}

module.exports = { insertEvent, getAllEvents };
