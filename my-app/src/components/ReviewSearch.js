import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const ReviewSearch = () => {
    const [tag, setTag] = useState('');
    const [courseID, setCourseID] = useState('');
    const [courseList, setCourseList] = useState([]);

    async function handleTagSearch(event){
        await setTag((lastTag) => {
            return event.target.value;
        });

        axios.get(`http://localhost:3000/course/${event.target.value}/getReviews`)
        .then((response) => {
            setCourseList(() => {
                return response.data.reviews;
            });
            console.log(courseList);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <div>
            <br></br>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control size='lg' value={tag} placeholder="Seach for tags" onChange={handleTagSearch}/>
                </Form.Group>
            </Form>

            {courseList && courseList.map((course) => {
                console.log(course.author)
                return <h1>{course.author}</h1>
            })}
        </div>
    );
};

export default ReviewSearch;