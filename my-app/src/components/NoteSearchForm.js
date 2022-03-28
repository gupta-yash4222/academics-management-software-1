import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const NoteSearchFrom = () => {
    const [tag, setTag] = useState('');
    const [courseID, setCourseID] = useState('');

    async function handleTagSearch(event){
        await setTag((lastTag) => {
            return event.target.value;
        });

        axios.get()
    }
    
    return (
        <div>
            <br></br>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control size='lg' value={tag} placeholder="Seach for tags" onChange={handleTagSearch}/>
                </Form.Group>
                <h3>OR</h3>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control size="lg" value={courseID} placeholder="search for course" />
                </Form.Group>
                
            </Form>
        </div>
    );
};

export default NoteSearchFrom;