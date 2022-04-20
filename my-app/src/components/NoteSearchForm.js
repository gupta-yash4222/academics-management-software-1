import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import NoteCard from './NoteCard';

const NoteSearchFrom = () => {
    const [tag, setTag] = useState('');
    const [courseID, setCourseID] = useState('');
    const [noteList, setNoteList] = useState(
        // [
        //     {
        //         courseID: 'CS253A',
        //         content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in neque eu justo malesuada lobortis in eget mi. Pellentesque sed viverra odio. Vestibulum euismod metus ac massa pulvinar rutrum. In sagittis turpis et dolor pretium, eget bibendum tellus venenatis. Nulla at interdum metus. Ut ultricies lectus vel vestibulum eleifend'
        //     },
        //     {
        //         courseID: 'CS220A',
        //         content: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam consequat eleifend lorem, eu pharetra mauris rhoncus in. Duis efficitur placerat magna nec pulvinar. Vivamus porta lobortis purus in lobortis. Donec eleifend convallis ante, in iaculis arcu lacinia eu.'
        //     },
        // ]
    );

    async function handleTagChange(event) {
        await setTag((lastTag) => {
            return event.target.value;
        });
    }

    async function handleTagSubmit(event) {
        event.preventDefault();

        console.log(event)

        axios.get('/notes')
            .then((response) => {
                setNoteList(() => {
                    return response.data;
                });
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
            <hr style={{ color: "white" }} />

            {noteList && <h3 style={{ color: "white" }}>Results</h3> && <br></br> && noteList.map((note) => {
                return (
                    <div>
                        <br></br>
                        <NoteCard courseID={note.courseID} title={note.title} content={note.content}></NoteCard>
                    </div>
                )
            })}
        </div>
    );
};

export default NoteSearchFrom;