import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";

    // Take one of the user's notes form fetch notes endpoint in thunderClient
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    // Get all Notes
    const getNotes = async () =>{
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json(); //parse the response in json
      setNotes(json) 
    }

    // Add a Note
    const addNote = async (title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description,  tag})    //means title:title, tag:tag etc.
      });
      const note = await response.json();
      setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async (id) =>{
      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json =  response.json();
      console.log(json);
      const newNotes = notes.filter((note)=>{return note._id !== id}) //returns all notes except the note with _id = id, means removed
      setNotes(newNotes);
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description,  tag})
      });
      const json =  await response.json();
      console.log(json)
      
      let newNotes = JSON.parse(JSON.stringify(notes))
      //Logic to edit in client side
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
        setNotes(newNotes)
      }
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;