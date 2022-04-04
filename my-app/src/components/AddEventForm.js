import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton'
import axios from 'axios';

function AddEventForm() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{ color: "#000000" }}>
            <Button variant="primary" onClick={handleShow}>
                Add Event
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{ color: "#000000" }}>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: "#000000" }}><Form>
                    <Row className="mb-1">
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>Event title</strong></Form.Label>
                            <Form.Control type="text" placeholder="title" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>start date</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="DD/MM/YYYY" /></span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>end date</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="DD/MM/YYYY" /></span>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>start time</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="HH:MM" /></span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>end time</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="HH:MM" /></span>
                        </Form.Group>
                    </Row>


                    <Row className="mb-3">
                        <strong><Form.Label >Repeat event on:</Form.Label></strong>
                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Sun" />
                            <Form.Check type="checkbox" label="Mon" />
                            <Form.Check type="checkbox" label="Tue" />
                            <Form.Check type="checkbox" label="Wed" />
                        </Form.Group>
                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Thur" />
                            <Form.Check type="checkbox" label="Fri" />
                            <Form.Check type="checkbox" label="Sat" />
                        </Form.Group>
                    </Row>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            <strong>Repeat weekly:</strong>
                        </Form.Label>
                        <Col sm="5">
                            <Form.Select defaultValue="Yes">
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            <strong>Add reminder</strong>
                        </Form.Label>
                        <Col sm="5">
                            <Form.Select defaultValue="Yes">
                                <option>none</option>
                                <option>10 min</option>
                                <option>30 min</option>
                                <option>60 min</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Row className='mb-1'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label><strong>add content:</strong></Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={{offset:5}}><Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Col>

                    </Row>

                </Form></Modal.Body>
            </Modal>
        </div>
    );
}

export default AddEventForm;