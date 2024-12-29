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
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2OTM3MmRjYzYyY2FjNWVhMmJkOGNmIn0sImlhdCI6MTczNTAyMzI0NH0.w57j63HKkNbjvjar0pnAXmWh1bGZzsBUCAImSJGwAL4"
        }
      });
      const json = await response.json(); //parse the response in json
      console.log(json)
      setNotes(json) 
    }

    // Add a Note
    const addNote = async (title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2OTM3MmRjYzYyY2FjNWVhMmJkOGNmIn0sImlhdCI6MTczNTAyMzI0NH0.w57j63HKkNbjvjar0pnAXmWh1bGZzsBUCAImSJGwAL4"
        },
        body: JSON.stringify({title, description,  tag})    //means title:title, tag:tag etc.
      });

      console.log("Adding a new Note")
      const note = {
        "_id": "676e4cb24ce9620382288dd0",
        "user": "6769372dcc62cac5ea2bd8cf",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "1735281842711",
        "__v": 0
      };
      setNotes(notes.concat(note))
    }

    //Delete a Note
    const deleteNote = async (id) =>{
      //API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2OTM3MmRjYzYyY2FjNWVhMmJkOGNmIn0sImlhdCI6MTczNTAyMzI0NH0.w57j63HKkNbjvjar0pnAXmWh1bGZzsBUCAImSJGwAL4"
        }
      });
      const json =  response.json();
      console.log(json);
      
      console.log("deleting the note with id: " + id);
      const newNotes = notes.filter((note)=>{return note._id !== id}) //returns all notes except the note with _id = id, means removed
      setNotes(newNotes);
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) =>{
      //API call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2OTM3MmRjYzYyY2FjNWVhMmJkOGNmIn0sImlhdCI6MTczNTAyMzI0NH0.w57j63HKkNbjvjar0pnAXmWh1bGZzsBUCAImSJGwAL4"
        },
        body: JSON.stringify({title, description,  tag})
      });
      const json =  response.json();
    
      //Logic to edit in client side
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
        
      }
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;