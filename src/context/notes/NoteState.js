import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    // Take one of the user's notes form fetch notes endpoint in thunderClient
    const notesInitial = [
        {
          "_id": "676a8910e7d773447dd11b82",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "1735035152205",
          "__v": 0
        },
        {
          "_id": "676a8911e7d773447dd11b84",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "1735035153336",
          "__v": 0
        },
        {
          "_id": "676e4cb24ce9620382288dd0",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "good Morning",
          "description": "Have a very nice day",
          "tag": "public",
          "date": "1735281842711",
          "__v": 0
        },
        {
          "_id": "676e4cfd4ce9620382288dd3",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "Learning React",
          "description": "To cmplt vdo 60",
          "tag": "private",
          "date": "1735281917641",
          "__v": 0
        },
        {
          "_id": "676a8910e7d773447dd11b821",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "1735035152205",
          "__v": 0
        },
        {
          "_id": "676a8911e7d773447dd11b842",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "My title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "1735035153336",
          "__v": 0
        },
        {
          "_id": "676e4cb24ce9620382288dd03",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "good Morning",
          "description": "Have a very nice day",
          "tag": "public",
          "date": "1735281842711",
          "__v": 0
        },
        {
          "_id": "676e4cfd4ce9620382288dd34",
          "user": "6769372dcc62cac5ea2bd8cf",
          "title": "Learning React",
          "description": "To cmplt vdo 60",
          "tag": "private",
          "date": "1735281917641",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    // Add a Note
    const addNote = (title, description, tag) =>{
      //TODO: API call
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
    const deleteNote = () =>{
      
    }

    //Edit a Note
    const editNote = () =>{
      
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;