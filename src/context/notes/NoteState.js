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
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;