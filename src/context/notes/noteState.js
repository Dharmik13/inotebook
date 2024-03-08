// this state file in this file we write all state and use context Api 

// for using the context API we need to imp create Context file 
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000";

    const notesInitial = []

    const [notes, setnotes] = useState(notesInitial);


    // Get All Notes 
    const getallNote = async () => {

        //API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)
        setnotes(json);
    }



    // Add a Note
    const addNote = async (title, description, tag) => {

        //API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setnotes(notes.concat(note));
    }



    // Delete A note 
    const deleteNote = async (id) => {

        //API Call 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)

        // logic for Delete in client side 
        const newNote = notes.filter((note) => {
            return note._id !== id;
        })
        setnotes(newNote)
    }



    // Edit Or Update a Note
    const editNote = async (id, title, description, tag) => {

        //API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json;
        console.log(json);


        let newNote = JSON.parse(JSON.stringify(notes));
        // logic for edit in client side 
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }

        }
        setnotes(newNote);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;