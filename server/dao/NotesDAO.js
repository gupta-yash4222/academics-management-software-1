const Note = require('../models/note.js');

const SERVER_ERROR_MSG = "Internal Server Error";

function getNotes() {
  return new Promise((resolve, reject) => {
    Note.find({}, (err, notes) => {
      if (err) {
        reject({
          status: 500,
          response: SERVER_ERROR_MSG
        });
      }
      else {
        resolve({
          status: 200,
          notes: notes
        });
      }
    });
  });
}

function insertNote(username, title, courseID, content, tags) {
  return new Promise((resolve, reject) => {
    var note = new Note({
      username: username,
      title: title,
      courseID: courseID,
      content: content,
      tags: tags
    });
    note.save(function (err) {
      if (err) {
        reject({
          status: 400,
          response: "Note not inserted"
        });
      }
      else {
        console.log(note._id);
        resolve({
          status: 201,
          response: "Note successfully inserted"
        });
      }
    });
  });
}


function deleteNote(noteID) {
  return new Promise((resolve, reject) => {
    Note.findOneAndDelete({
      _id: noteID
    },
      function (err, note) {
        if (err) {
          reject({
            status: 500,
            response: "A server error occurred"
          });
        }
        else if (!note) {
          reject({
            status: 404,
            response: "Note not found"
          });
        }
        else {
          resolve({
            status: 202,
            response: "Note successfully deleted"
          });
        }
      });
  });
}



function fetchNotesByCourseID(currRollNo, currCourseID) {
  return new Promise((resolve, reject) => {
    Note.find({
      courseID: currCourseID,
      rollNo: currRollNo
    },
      function (err, note) {
        if (err) {
          reject({
            status: 500,
            response: "A server error occurred"
          });
        }
        else if (!note) {
          reject({
            status: 404,
            response: "Note not found"
          });
        }
        else {
          resolve({
            status: 202,
            response: "Note successfully deleted"
          });
        }
      });
  });

}


/*

function fetchNotes(noteID){
  return new Promise((resolve, reject) => {
    Note.findOneAndDelete({
      _id: noteID
    }, 
    function(err, note){
      if(err){
        reject({
          status: 500,
          response: "A server error occurred"
        });
      }
      else if(!note){
        reject({
          status: 404,
          response: "Note not found"
        });
      }
      else{
        resolve({
          status: 202,
          response: "Note successfully deleted"
        });
      }
    });
  });
}

*/

function updateNote(noteID, username, title, content, tags) {
  return new Promise((resolve, reject) => {
    Note.findOne({
      _id: noteID
    },
      function (err, note) {
        if (err) {
          reject({
            status: 500,
            response: "A server error occurred"
          });
          return;
        }
        else if (!note) {
          reject({
            status: 404,
            response: "Note not found"
          });
          return;
        }
        else if (note.username != username) {
          reject({
            status: 403,
            response: "Operation not allowed"
          });
          return;
        }

        Note.updateOne({
          _id: note._id
        },
          {
            title: title,
            content: content,
            tags: tags
          },
          function (err, note) {
            if (err) {
              reject({
                status: 500,
                response: "A server error occurred"
              });
              return;
            }
            else if (!note) {
              reject({
                status: 404,
                response: "Note not found"
              });
              return;
            }
            else {
              resolve({
                status: 202,
                response: "Note successfully updated"
              });
            }
          });
      });
  });
}



//module.exports = {insertNote, deleteNote, updateNote, fetchNotesByCourseID};

module.exports = { getNotes, insertNote, deleteNote, updateNote };
