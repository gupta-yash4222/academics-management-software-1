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
        // console.log(note);
    }

    function handleCourseNameChange(event) {
        setNote(previousState => {
            return { ...previousState, course: event.target.value }
        });

        // console.log(note);

    }

    function handleTagChange(event) {
        setTag(event.target.value);
        // console.log("tag = " + tag);
    }


    function handleTagSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        let tempList;

        if (note.tags) {
            tempList = note.tags;
            tempList.push(event.target.value);
        }
        else {
            tempList = [event.target.value];
        }
        // console.log(tempList);
        setNote(previousState => {
            return { ...previousState, tags: tempList };
        });
    }

    function handleDescriptionChange(event) {
        setNote(previousState => {
            return { ...previousState, content: event.target.value }
        });

        // console.log(note);

    }

    function handleNoteSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        // console.log(note);
        // alert(note);

        axios.post('http://localhost:3000/notes', { title:note.title, tags: note.tags, content: note.content, course:note.course })
            .then(function (res) {
                if (res.status === 201) {
                    console.log("posted successfully");
                }
                else {
                    console.log("error1: " + "oops!! there was some ERROR");
                }
            }).catch(function (res) {
                console.log("oops!! API request failed");
            });
    }

    return (
        <div>
            <form class="notes-form" >
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

                <label>add tags: </label>
                <div id="button-input-clubbed">
                    <input type="text" id="input-tag" value={tag} onChange={handleTagChange} placeholder="enter tag" style={{marginRight:"20px"}}/>
                    <button id="button-tag-submit" value={tag} onClick={handleTagSubmit} style={{backgroundColor:"#474948", padding:"10px", 
                    color:"white", borderRadius:"5px", border:"none"}}>add tag</button>
                </div>

                <div>
                    <label>Note Description:</label>
                    <br />
                    <textarea type="text" id="input-textarea" value={note.description} onChange={handleDescriptionChange} placeholder="enter your notes here..." ></textarea>
                </div>

                <div>
                    <button type="submit" id="button-note-submit" onClick={handleNoteSubmit}>Submit Note</button>
                </div>

            </form>
        </div>
    )
}

export default Notes;