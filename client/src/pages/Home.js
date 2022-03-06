import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = function () {
    const [message, setMessage] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3000/submit', { message })
        .then(function(res){
            if(res.data === 'success'){
                console.log("posted successfully");
            }
            else{
                console.log("oops!! there was some ERROR");
            }
        }).catch(function(res){
            console.log("oops!! there was an error");
        });
    }

    function handleNameChange(event){
        setMessage({name: event.target.value, note: message.text}, (message) => {
            console.log(message);
        });
    }

    function handleNoteChange(event){
        setMessage({name: message.name, note: event.target.value}, (message) => {
            console.log(message);
        });    
    }

    return (
        <div>
            <form className="message-form" >
                <div>
                    <input type="text" name="name" value={message.name} onChange={handleNameChange} className='input-text' />
                </div>
                <div>
                    <label className='form-label'>name</label>
                </div>
                <div>
                    <textarea name="note" className='input-text' value={message.note} onChange={handleNoteChange}/>
                </div>
                <div>
                    <label className='form-label'>message</label>
                </div>
                <div>
                    <button type="submit" className='button-submit' onClick={handleSubmit}>submit</button>
                </div>

            </form>
        </div>
    )
}

export default Home;
