// this file is for featch all the notes 

import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getallNote, editNote } = context;

    useEffect(() => {
        getallNote();
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null)
    const refClose = useRef(null)   // this is for close the modal when we click on the update note button
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    // for update the note 
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        console.log("Updating Note", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();

    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">

                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>updateNote</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your Notes</h3>

                {/* frontend validation - when no notes then display NO notes to display */}
                <div className="container mx-2">
                    {notes.length === 0 && 'No Notes To Display, Please Add Note to see Your Notes'}
                </div>

                {/* featch All notes Without Using Api , we do hard code   */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />


                })}
            </div >
        </>

    )
}

export default Notes;
