// this file is for featch all the notes 

import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes } = context;
    return (
        <>
            <Addnote />

            <div className="row my-3">
                <h3>Your Notes</h3>
                {/* featch All notes Without Using Api , we do hard code   */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />


                })}
            </div >
        </>

    )
}

export default Notes;
