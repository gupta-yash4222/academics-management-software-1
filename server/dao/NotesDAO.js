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

module.exports = { insertNote };
