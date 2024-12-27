import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;

    return (
        <div className="row my-3">
            <h2>Your Notes</h2>
            {/* To iterate through each note in notes */}
            {notes.map((note)=>{
            return <NoteItem note = {note}/>
            })}
        </div>
    )
}

export default Notes
