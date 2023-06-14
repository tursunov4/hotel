import { createContext , useState } from "react";

const Context =createContext();

const ContextProvider = ({children}) =>{
    const[locations, setLocations] = useState([])
    const[adress1 , setAdress1]= useState('')
    return(
        <Context.Provider value={{locations , setLocations, adress1, setAdress1}}>
            {children}
        </Context.Provider>
    )
}
export {Context, ContextProvider}
