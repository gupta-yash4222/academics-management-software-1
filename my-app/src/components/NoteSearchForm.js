import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const NoteSearchFrom = () => {
    const [tag, setTag] = useState('');
    const [courseID, setCourseID] = useState('');

    async function handleTagChange(event) {
        await setTag((lastTag) => {
            return event.target.value;
        });
    }

    async function handleTagSubmit(event) {
        event.preventDefault();
        // await axios()
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
        </div>
    );
};

export default NoteSearchFrom;