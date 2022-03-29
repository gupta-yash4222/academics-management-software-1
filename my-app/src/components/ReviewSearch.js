import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReviewCard from './ReviewCard';

const ReviewSearch = () => {
    const [tag, setTag] = useState('');
    const [courseID, setCourseID] = useState('');
    const [courseList, setCourseList] = useState([]);

    async function handleTagChange(event){
        await setTag((lastTag) => {
            return event.target.value;
        }); 
    }

    function handleTagSubmit(event) {
        event.preventDefault();
        
        axios.get(`http://localhost:3000/course/${event.target[0].value}/getReviews`)
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
            <Form onSubmit={handleTagSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control size='lg' value={tag} placeholder="Seach for tags" onChange={handleTagChange} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>

            <hr style={{color:"white"}} />
            
            {/* <br></br> */}
            {courseList && <h3 style={{color:"white"}}>Results</h3> && <br></br> && courseList.map((course) => {
                console.log(course.author)
                return(  
                <div>
                    <br></br>
                    <ReviewCard reviewID={course.reviewID} likes={course.likes} content={course.review}></ReviewCard>
                </div>)
            })}
        </div>
    );
};

export default ReviewSearch;