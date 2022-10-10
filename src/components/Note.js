import React, { useState } from 'react';

export default function Note(props) {

    function handleChange(e){

        props.handleChange(props.id,e)
        // props.saveNote(props.id, text)
    }
    return (
        
        <div className="note">
            <div className="noteHeader">
                {/* <button onClick={() => props.saveNote(props.id,text)}>S</button> */}
                <button onClick={() => props.removeNote(props.id)}>X</button>
            </div>
            <textarea className='noteBody' placeholder={"New note"} value={props.text} onChange={handleChange}>
            </textarea>
            
        </div>)
}