import { createContext, useContext, useEffect, useState } from "react";
import { useUsercontext } from "./UserContext";
import io from 'socket.io-client'

export const SocketContext = createContext()


export const useSocketContext = ()=>{
    return useContext(SocketContext)
}


export const SocketProvider = ({children})=>{
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const {user}=useUsercontext()

    useEffect(()=>{
        if(user){
            const newSocket = io("http://localhost:5000",{
                query:{
                    userId:user.id
                }
            })
            setSocket(newSocket)
            newSocket.on("online", (data)=>{
                setOnlineUsers(data)
            })
            return ()=>{
                newSocket.close()
            }
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[user])
    return(
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}