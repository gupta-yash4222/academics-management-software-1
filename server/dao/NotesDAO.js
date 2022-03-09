const Note = require('../../models/note.js');

function insertNote(rollNo, title, content, tags){
  return new Promise((resolve, reject) => {
    var note = new Note({
      rollNo: rollNo,
      title: title,
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


module.exports = {insertNote, deleteNote};
