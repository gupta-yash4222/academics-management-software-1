const Note = require('../models/note.js');

function insertNote(rollNo, title, courseID, content, tags){
  return new Promise((resolve, reject) => {
    var note = new Note({
      rollNo: rollNo,
      title: title,
      courseId: courseID,
      content: content,
      tags: tags
    });
    note.save(function(err){
      if(err){
        reject({
          status: 400,
          response: "Note not inserted"
        });
      }
      else{
        resolve({
          status: 201,
          response: "Note successfully inserted"
        });
      }
    });
  });
}

function deleteNote(noteID){
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

function fetchNotesByCourseID(currRollNo, currCourseID){
  return new Promise((resolve, reject) => {
    Note.find({
      courseID: currCourseID,
      rollNo:currRollNo
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

function updateNote(noteID, rollNo, title, content, tags) {
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
        else if (note.rollNo != rollNo) {
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
        function(err, note){
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
          else{
            resolve({
              status: 202,
              response: "Note successfully updated"
            });
          }
        });
      });
  });
}

module.exports = {insertNote, deleteNote, updateNote, fetchNotesByCourseID};
