import { createContext, useContext, useState } from "react";

export const ConversatonContext = createContext();

export const useConversatonContext = () => {
  return useContext(ConversatonContext);
}

export const ConversatonProvider = ({ children }) => {
    const [conversation, setConversation] = useState(null);
  return <ConversatonContext.Provider value={{conversation, setConversation}}>{children}</ConversatonContext.Provider>;
}