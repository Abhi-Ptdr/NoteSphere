import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e) => {
        e.preventDefault();     //to prevent page reload
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
    }

    const onChange = (e) => { 
        //using spread operator(...) which keep note as is and add or ovwrwrite the value in targeted input field 
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
                </div>                
                <button type="submit" disabled={note.title.length < 5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
}

export default AddNote;
