import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const context = useContext(NoteContext);
    const {notes, getNotes, editNote} = context;

    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            navigate("/login");
        }
      // eslint-disable-next-line
    }, []);
    
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => { 
        //using spread operator(...) which keep note as is and add or ovwrwrite the value in targeted input field 
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" disabled={note.etitle.length < 5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && 'No Notes to Display'}      {/*when we have nothing in else part so we can use && */}
                </div>
                {notes.map((note)=>{
                return <NoteItem key = {note._id} note = {note} showAlert={props.showAlert} updateNote={updateNote}/>
                })}
            </div>
        </>
    )
}

export default Notes
