import { AuthContext } from "../context/useAuthenticationContext";

import { useContext } from "react";
export const  useAuthContext = () =>{
    
const context = useContext(AuthContext)
    if(!context){
        throw Error ('useAuthContext must be used inside ')
    }
    return context; 
}