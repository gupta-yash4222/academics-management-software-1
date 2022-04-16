import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Profile = () => {
    return (
        <div>
            <Card style={{ width: '40rem' , margin:"auto" , padding:"10px", marginTop:"100px", color:"black"}}>
                <Card.Img src="https://i.pravatar.cc/300" style={{borderRadius:"50%", float:"centre", marginLeft:"210px", width: "35%", height: "35%" }} />
                <Card.Body>
                    <Card.Title>Student Name</Card.Title>
                    <Card.Text>
                        <ul>
                            <li>Roll No: 200000</li>
                            <li>Program: B.tech</li>
                            <li>Department: XYZ</li>
                            <li>Sem completed: 6</li>
                            <li>Course Credits completed: 354</li>
                        </ul>
                    </Card.Text>
                    <Button variant="primary">Progress Dashboard</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;