import { useState } from "react";
import adminContext from "./adminContext";

const AdminState= (props) =>{

    const [admin, setAdmin]= useState(null)

    return (
        <adminContext.Provider value={{admin, setAdmin}}>
         {props.children}
        </adminContext.Provider>
    )
}

export default  AdminState;