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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNDM4MDU0MGVlNzNkOGYyZDQ0NzMxIn0sImlhdCI6MTcwODY2NDgzMH0.HX33fsqXEjTRzTRE4sS8A83lDC_43O5ypeYQvFnCoQU"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNDM4MDU0MGVlNzNkOGYyZDQ0NzMxIn0sImlhdCI6MTcwODY2NDgzMH0.HX33fsqXEjTRzTRE4sS8A83lDC_43O5ypeYQvFnCoQU"
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const json = await response.json();
        console.log(json)


        // logic for ADD note in client side 
        const note = {
            "_id": "65d83273ed25632e7a99f3ef6",
            "user": "65d4380540ee73d8f2d4d4731",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "1708667507850",
            "__v": 0
        }
        setnotes(notes.concat(note));
    }



    // Delete A note 
    const deleteNote = async (id) => {

        //API Call 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNDM4MDU0MGVlNzNkOGYyZDQ0NzMxIn0sImlhdCI6MTcwODY2NDgzMH0.HX33fsqXEjTRzTRE4sS8A83lDC_43O5ypeYQvFnCoQU"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkNDM4MDU0MGVlNzNkOGYyZDQ0NzMxIn0sImlhdCI6MTcwODY2NDgzMH0.HX33fsqXEjTRzTRE4sS8A83lDC_43O5ypeYQvFnCoQU"
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