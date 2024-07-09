import { createContext, useContext, useState } from "react";

export const userContext = createContext(); // Create a context object

export const useUsercontext = ()=>{
    return useContext(userContext)

} // Create a hook to use the context object

export const UserProvider = ({children}) => { // Create a provider for the context object
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('chat'))|| null)
    
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}