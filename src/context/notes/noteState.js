// this state file in this file we write all state and use context Api 

// for using the context API we need to imp create Context file 
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "65d831fded25632ea99f3ef0",
            "user": "65d4380540ee73d8f2d44731",
            "title": "virat King Kohli",
            "description": "He is the best betsman all time",
            "tag": "Cricket Lover",
            "date": "1708667389993",
            "__v": 0
        },
        {
            "_id": "65d83273ed25632ea99f3ef6",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Rohit Sharma The Hitter",
            "description": "He is the best Hitter betsman all time and also known as Ro-Hitman Sharma",
            "tag": "Cricket Lover",
            "date": "1708667507850",
            "__v": 0
        },
        {
            "_id": "65d831fded25632ea99f3ef0",
            "user": "65d4380540ee73d8f2d44731",
            "title": "virat King Kohli",
            "description": "He is the best betsman all time",
            "tag": "Cricket Lover",
            "date": "1708667389993",
            "__v": 0
        },
        {
            "_id": "65d83273ed25632ea99f3ef6",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Rohit Sharma The Hitter",
            "description": "He is the best Hitter betsman all time and also known as Ro-Hitman Sharma",
            "tag": "Cricket Lover",
            "date": "1708667507850",
            "__v": 0
        },
        {
            "_id": "65d831fded25632ea99f3ef0",
            "user": "65d4380540ee73d8f2d44731",
            "title": "virat King Kohli",
            "description": "He is the best betsman all time",
            "tag": "Cricket Lover",
            "date": "1708667389993",
            "__v": 0
        },
        {
            "_id": "65d83273ed25632ea99f3ef6",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Rohit Sharma The Hitter",
            "description": "He is the best Hitter betsman all time and also known as Ro-Hitman Sharma",
            "tag": "Cricket Lover",
            "date": "1708667507850",
            "__v": 0
        },
        {
            "_id": "65d83b11d4ab5640e5bf0f5d",
            "user": "65d4380540ee73d8f2d44731",
            "title": "Kl Rahul The Class Rahul",
            "description": "He is a Very classic Betsman ",
            "tag": "Cricket",
            "date": "1708669713555",
            "__v": 0
        }
    ]

    const [notes, setnotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;