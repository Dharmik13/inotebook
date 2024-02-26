// this state file in this file we write all state and use context Api 

// for using the context API we need to imp create Context file 
import NoteContext from "./noteContext";


const NoteState = (props) => {


    return (
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;