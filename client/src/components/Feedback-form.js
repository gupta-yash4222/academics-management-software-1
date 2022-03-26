import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import StarRating from './Start-rating';
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

const FeedbackForm = function () {
    var [feedback, setFeedback] = useState({});
    var [tag, setTag] = useState();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const semOptions = [
        { semText: 'summer', code: 0 }, { semText: 'odd', code: 1 }, { semText: 'even', code: 2 }
    ];
    // const defaultOption = semOptions[0];

    let currentYear = new Date().getFullYear();
    let earliestYear = 1960;
    let YearList = [];
    while (currentYear >= earliestYear) {
        YearList.push(currentYear);
        currentYear = currentYear - 1;
    }

    function handleCourseIDChange(event) {
        setFeedback(previousState => {
            return { ...previousState, courseID: event.target.value }
        });
        // console.log(feedback);
    }

    function handleSemChange(event) {
        setFeedback(previousState => {
            return { ...previousState, sem: event.target.value }
        });

        // console.log(feedback);

    }

    function handleYearChange(event) {
        setFeedback(previousState => {
            return { ...previousState, year: event.target.value }
        });

        // console.log(feedback);

    }

    function handleTagChange(event) {
        setTag(event.target.value);
        // console.log("tag = " + tag);
    }


    function handleTagSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        let tempList;

        if (feedback.tags) {
            tempList = feedback.tags;
            tempList.push(event.target.value);
        }
        else {
            tempList = [event.target.value];
        }
        // console.log(tempList);
        setFeedback(previousState => {
            return { ...previousState, tags: tempList };
        });
    }

    function handleReviewChange(event) {
        setFeedback(previousState => {
            return { ...previousState, review: event.target.value }
        });

        // console.log(feedback);

    }

    function handleFeedbackSubmit(event) {
        // event.preventDefault();
        event.stopPropagation();
        // console.log(feedback);
        // alert(feedback);

        //make sure courseID is filled
        axios.post(`http://localhost:3000/course/${feedback.courseID}/addReview`, {
            courseID: feedback.courseID, tags: feedback.tags,
            sem: feedback.sem, year: feedback.year, rating: rating,
            review: feedback.review
        })
            .then(function (res) {
                if (res.status === 201) {
                    console.log("posted successfully");
                }
                else {
                    console.log("error1: " + "oops!! there was some ERROR");
                }
            }).catch(function (res) {
                console.log(res);
                console.log("oops!! API request failed");
            });
    }

    return (
        <div>

            <form className="notes-form" >
                <div>
                    <h1>Add Review</h1>
                </div>  
                <div className="input">
                    <span><label>courseID</label></span>
                    <input type="text" className="input-title" value={feedback.title} onChange={handleCourseIDChange} required placeholder="courseID(i.e. MTH101A)" />
                </div>

                <div className="input">
                    <label>semester</label>
                    <select value={feedback.sem} className="input-select" onChange={handleSemChange} required>
                        {
                            semOptions.map((currSem) => {
                                return <option value={currSem.code}>{currSem.semText}</option>
                            })
                        }
                    </select>
                </div>
                <div className="input">

                    <label>year</label>
                    <select value={feedback.year} className="input-select" onChange={handleYearChange} required>
                        {
                            YearList.map((currYear) => {
                                let disp = `${currYear.toString()}-${(currYear + 1).toString().substring(2)}`;
                                return <option value={currYear} className="center-box">{disp}</option>
                            })
                        }
                    </select>
                </div>

                <div className="input">
                    <label>add tags: </label>
                    <div id="button-input-clubbed">
                        <input type="text" className="input-tag" value={tag} onChange={handleTagChange} placeholder="enter tag" style={{ marginRight: "20px" }} />
                        <button className="button-submit" value={tag} onClick={handleTagSubmit} style={{
                            backgroundColor: "#474948", padding: "10px",
                            color: "white", borderRadius: "5px", border: "none"
                        }}>add tag</button>
                    </div>
                </div>
                <div className="input">
                    <label>Feedback Description:</label>
                    <br />
                    <textarea type="text" className="input-textarea" value={feedback.description} onChange={handleReviewChange} placeholder="enter your feedbacks here..." ></textarea>
                </div>

                <div className="input">
                    <label>overall course rating</label>
                    <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || rating) ? "on" : "off"}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                    required>
                                    <span className="star">&#9733;</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <Link to='/' >
                        <button style={buttonStyle}>Cancel</button>
                    </Link>
                    <button type="submit" style={buttonStyle} onClick={handleFeedbackSubmit}>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default FeedbackForm;