import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const Addnote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "Default" });

    const handleClick = (e) => {
        e.preventDefault();  // this for no page reload
        addNote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added SuccessFully", "success");
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className=" notes my-2">
                <h2>Add Note</h2>
                <div className="container my-3">
                    <form className='my-3'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Enter Title:</label>
                            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Enter Description:</label>
                            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Enter Tag:</label>
                            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                        </div>

                        <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Addnote
