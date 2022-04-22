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

const AddNotes = function () {
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

    function handleCourseIDChange(event) {
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

        axios.post(`/notes`,
            {
                courseID: note.courseID,
                title: note.title,
                content: note.content,
                tags: note.tags
            },
            {
                withCredentials: true
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    console.log('Note added');
                    alert('Note added');
                }
                else {
                    console.log('There was some ERROR');
                    alert('Note could not be added');
                }
            }).catch((error) => {
                console.log('API request failed');
                alert('Note could not be added');
            });
    }

    return (
        <div>
            <form class="notes-form" >
                <div>
                    <label>Note Title:</label>
                    <input type="text" className="input-title" value={note.title} onChange={handleTitleChange} placeholder="Note Title" />
                </div>

                <div>
                    <label>Select Course: </label>
                    <select value={note.courseID} className="input-select" onChange={handleCourseIDChange}>
                        {
                            options.map(currValue => {
                                return <option value={currValue}>{currValue}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <label >Note Description:</label>
                    <textarea type="text" className="input-textarea" value={note.description} onChange={handleDescriptionChange} placeholder="Enter your note here" ></textarea>
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

export default AddNotes;