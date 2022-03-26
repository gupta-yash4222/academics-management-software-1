import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const buttonStyle = {
    width: "10%",
    backgroundColor: "#474948",
    color: "white",
    padding: "10px 10px",
    margin: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    justifyContent: "center"
}

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

        axios.post('http://localhost:3000/notes', { title: note.title, tags: note.tags, content: note.content, course: note.course })
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
                    <input type="text" className="input-title" value={note.title} onChange={handleTitleChange} placeholder="note title" />
                </div>

                <div>
                    <label>select relevant course: </label>
                    <select value={note.courseName} className="input-select" onChange={handleCourseNameChange}>
                        {
                            options.map(currValue => {
                                return <option value={currValue}>{currValue}</option>
                            })
                        }
                    </select>
                </div>

                <label>add tags: </label>
                <div id="button-input-clubbed">
                    <input type="text" className="input-tag" value={tag} onChange={handleTagChange} placeholder="enter tag" style={{ marginRight: "20px" }} />
                    <button style={buttonStyle} value={tag} onClick={handleTagSubmit} >add tag</button>
                </div>

                <div>
                    <label >Note Description:</label>
                    <textarea type="text" className="input-textarea" value={note.description} onChange={handleDescriptionChange} placeholder="enter your notes here..." ></textarea>
                </div>

                <div>
                    <Link to='/' >
                        <button style={buttonStyle}>Cancel</button>
                    </Link>
                    <button type="submit" style={buttonStyle} onClick={handleNoteSubmit}>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default Notes;