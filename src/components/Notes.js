import React, { useState, useEffect } from 'react';
import Note from '../components/Note'
import Sidebar from './Sidebar';

export default function Notes(props) {
    const [notes, setNotes] = useState([]);
    const [isSynced, setIsSynced] = useState(true);

    useEffect(() => {
        getNotes();
      },[])

    useEffect(() => {
        const interval = setInterval(()=>{
          syncNotes()
          clearInterval(interval)
          setIsSynced(true);
        },5000);
    },[isSynced])

    function getNotes(){
        console.log("Getting notes")
        fetch(`/api/getnotes`,{credentials: 'include',mode: 'cors', method: 'GET'})
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setNotes(data)
          });
      }
    
      function addNote(){
        var testtext = {"text": "New Note"}
        fetch(`/api/addnote`, {headers: {'Content-Type': 'application/json'},credentials: 'include', method: 'POST' , mode: 'cors', body: JSON.stringify(testtext)})
          .then((response) => response.json())
          .then((data) => {
            getNotes();
          })
      }
    
      function removeNote(id){
        console.log("Removing note " + id)
        var removeId = {_id: id}
        fetch(`/api/removenote`, {headers: {'Content-Type': 'application/json'},credentials: 'include', method: 'POST' , mode: 'cors', body: JSON.stringify(removeId)})
        .then((response) => response.json())
        .then((data) => {
          console.dir(data)
          var array = [...notes];
          var foundIndex = array.findIndex((element) => element._id == id)
          array.splice(foundIndex,1);
          setNotes(array);
        })
      }
    
      function syncNotes(){
        console.log("Trying to sync")
        console.log("IS Synced: " + isSynced)
        if(!isSynced){
          console.log("Syncing notes")
          var array = notes;
          array.forEach((note) => {
            if(note.hasChanged){
              fetch(`/api/editnote`, {headers: {'Content-Type': 'application/json'},credentials: 'include', method: 'POST' , mode: 'cors', body: JSON.stringify(note)})
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
              })
            }
          })
        }
      }
    
      function handleChange(id,e){
        var array = [...notes];
        var foundIndex = array.findIndex((element) => element._id == id)
        array[foundIndex].text = e.target.value;
        array[foundIndex].hasChanged = true;
        setNotes(array);
        setIsSynced(false)
      }

    return (
        
        <div className="noteContainer">
            <Sidebar addNote={addNote} isSynced={isSynced} logout={props.logout}></Sidebar>
            <ul className='noteList'>
                {notes.map((note) => (<Note text={note.text} id={note._id} key={note._id} removeNote={removeNote} handleChange={handleChange}></Note>))}
            </ul>
            
        </div>)
}