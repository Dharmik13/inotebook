// this file is for notes items 

import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props

    const handleDelete = (e) => {
        e.preventDefault();
        deleteNote(note._id);
        props.showAlert("Note Deleted SuccessFully", "success");
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <img src="img/inotebook_card.jpg" class="card-img-top" alt="error" />
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
                </div>
            </div>
        </div >
    )
}

export default Noteitem
