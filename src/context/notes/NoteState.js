import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "Harry",
        "class": "5b"
    }
    // state that we want to pass in let say About compo.
    const [state, setState] = useState(s1);

    //fxn to update state and we can pass fxn as well in value
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name": "Abhi",
                "class": "10a"
            })
        }, 1000);
    } 

    return(
        <NoteContext.Provider value={{state, update}}>  {/* This is same as {state:state, update:update} We have to create object to pass multiple values */}
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;