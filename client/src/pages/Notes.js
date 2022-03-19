import axios from 'axios';
import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const Notes = function () {
    var [note, setNote] = useState({});
    var [tag, setTag] = useState();

    const options = [
        'CS253A', 'CS315A', 'AE462A', 'AE712A', 'CSO203A', 'MBA634A'
    ];
    const defaultOption = options[0];

    function handleTitleChange(event) {
        setNote(previousState => {
            return { ...previousState, title: event.target.value }
        });
        console.log(note);
    }

    function handleCourseNameChange(event) {
        setNote(previousState => {
            return { ...previousState, course: event.target.value }
        });

        console.log(note);

    }

    function handleTagChange(event) {
        setTag(event.target.value);
    }

    function handleTagSubmit(event) {
        var tempList = note.tags;
        tempList.push(event.target.value);
        setNote(previousState => {
            return { ...previousState, tags: tempList };
        });
    }

    function handleDescriptionChange(event) {
        setNote(previousState => {
            return { ...previousState, description: event.target.value }
        });

        console.log(note);

    }

    function handleNoteSubmit(event) {
        event.preventDefault();
        console.log(note);
        // alert(note);

        axios.post('http://localhost:3000/notes', { note })
            .then(function (res) {
                if (res.data === 'success') {
                    console.log("posted successfully");
                }
                else {
                    console.log("oops!! there was some ERROR");
                }
            }).catch(function (res) {
                console.log("oops!! there was an error");
            });
    }

    return (
        <div>
            <form class="notes-form" onSubmit={handleNoteSubmit}>
                <div>
                    <label>Note Title:</label>
                    <input type="text" id="input-title" value={note.title} onChange={handleTitleChange} placeholder="note title" />
                </div>

                <div>
                    <label>select relevant course: </label>
                    <select value={note.courseName} id="input-select" onChange={handleCourseNameChange}>
                        {
                            options.map(currValue => {
                                return <option value={currValue}>{currValue}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <label>add tags: </label>
                    <div id="button-input-clubbed">
                        <input type="text" id="input-tag" value={tag} onChange={handleTagChange} placeholder="enter tag" />
                        <button id="button-tag-submit" onClick={handleTagSubmit}>add tag</button>
                    </div>

                </div>


                <div>
                    <label>Note Description:</label>
                    <br />
                    <textarea type="text" id="input-textarea" value={note.description} onChange={handleDescriptionChange} placeholder="enter your notes here..." ></textarea>
                </div>

                <div>
                    <button type="submit" id="button-note-submit">Submit Note</button>
                </div>

            </form>
        </div>
    )
}

export default Notes;