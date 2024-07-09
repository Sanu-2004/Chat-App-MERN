import { createContext, useContext, useState } from "react";

export const MessageContext= createContext();

export const useMessageContext = () => {
    return useContext(MessageContext)
}

export const MessageProvider = ({children}) => {
    const [messages, setMessages] = useState([])
    return <MessageContext.Provider value={{messages, setMessages}}>
        {children}
        </MessageContext.Provider>
}