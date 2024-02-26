// this state file in this file we write all state and use context Api 

// for using the context API we need to imp create Context file 
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const s1 = {
        "name": "Dharmik",
        "class": "10a"
    }

    // we can set the state or update the state also for this we need to use useState
    const [state, setstate] = useState(s1);

    // for update the state 
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "DmPatel",
                "class": "12a"
            })
        }, 3000);
    }
    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;