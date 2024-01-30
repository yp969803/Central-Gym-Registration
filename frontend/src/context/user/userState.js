import { useState } from "react";
import userContext from "./userContext";

const UserState = (props)=>{
    const [user, setUser]= useState(null)

    return (
        <userContext.Provider value={{user, setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default  UserState;