const Note = require('../models/note.js');
const User = require('../models/user.js');

const SERVER_ERROR_MSG = "Internal Server Error";
const USER_NOT_FOUND_ERROR_MSG = "User not found";

async function getNotes(username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({
                    status: 500,
                    message: SERVER_ERROR_MSG
                });
            }
            else if (!user) {
                reject({
                    status: 400,
                    message: USER_NOT_FOUND_ERROR_MSG
                });
            }
            else {
                resolve({
                    status: 200,
                    message: 'Notes found',
                    notes: user.notes
                });
            }
        });
    });
}

async function addNote(username, title, courseID, content, tags) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({
                    status: 500,
                    message: SERVER_ERROR_MSG
                });
            }
            else if (!user) {
                reject({
                    status: 400,
                    message: USER_NOT_FOUND_ERROR_MSG
                });
            }
            else {
                let note = new Note({
                    username: username,
                    title: title,
                    courseID: courseID,
                    content: content,
                    tags: tags
                });
                note.save();
                user.notes.push(note);
                user.save();
                resolve({
                    status: 200,
                    message: 'Note inserted'
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

module.exports = { getNotes, addNote, deleteNote, updateNote };
