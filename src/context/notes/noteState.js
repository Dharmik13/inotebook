// this state file in this file we write all state and use context Api 

// for using the context API we need to imp create Context file 
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "65d831fded25632ea99f23ef0",
            "user": "65d4380540ee73d8f2d44731",
            "title": "virat King Kohli",
            "description": "He is the best betsman all time",
            "tag": "Cricket Lover",
            "date": "1708667389993",
            "__v": 0
        },
        {
            "_id": "65d83273ed25632ea199f3ef6",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Rohit Sharma The Hitter",
            "description": "He is the best Hitter betsman all time and also known as Ro-Hitman Sharma",
            "tag": "Cricket Lover",
            "date": "1708667507850",
            "__v": 0
        },
        {
            "_id": "65d831fded25632ea599f3ef0",
            "user": "65d4380540ee73d8f2d44731",
            "title": "virat King Kohli",
            "description": "He is the best betsman all time",
            "tag": "Cricket Lover",
            "date": "1708667389993",
            "__v": 0
        },
        {
            "_id": "65d83273ed25632e4a99f3ef6",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Rohit Sharma The Hitter",
            "description": "He is the best Hitter betsman all time and also known as Ro-Hitman Sharma",
            "tag": "Cricket Lover",
            "date": "1708667507850",
            "__v": 0
        },
        {
            "_id": "65d831fded25632ea699f3ef0",
            "user": "65d4380540ee73d8f2d44731",
            "title": "virat King Kohli",
            "description": "He is the best betsman all time",
            "tag": "Cricket Lover",
            "date": "1708667389993",
            "__v": 0
        },
        {
            "_id": "65d83273ed25632e7a99f3ef6",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Rohit Sharma The Hitter",
            "description": "He is the best Hitter betsman all time and also known as Ro-Hitman Sharma",
            "tag": "Cricket Lover",
            "date": "1708667507850",
            "__v": 0
        },
        {
            "_id": "65d83b11d4ab56408e5bf0f5d",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Kl Rahul The Class Rahul",
            "description": "He is a Very classic Betsman ",
            "tag": "Cricket",
            "date": "1708669713555",
            "__v": 0
        }
    ]

    const [notes, setnotes] = useState(notesInitial);

    // Add a Note

    const addNote = (title, description, tag) => {
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
    const deleteNote = (id) => {
        const newNote = notes.filter((note) => {
            return note._id !== id;
        })
        setnotes(newNote)
    }

    // Edit Or Update a Note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;