import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e) => {
        e.preventDefault();     //to prevent page reload
        addNote(note.title, note.description, note.tag);
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
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1"> Check me out </label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    );
}

export default AddNote;
