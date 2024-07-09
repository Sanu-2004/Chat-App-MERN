import { useEffect } from "react"
import { useMessageContext } from "../Context/MessagesContext"
import { useSocketContext } from "../Context/SocketContext"

const GetNewmessagehook = () => {
    const {socket} = useSocketContext()
    const{messages, setMessages} = useMessageContext()
    useEffect(()=>{
        if(socket){
            socket?.on("newMessage", (data)=>{
                setMessages([...messages, data])
            })
            return ()=>{
                socket.off("newMessage")
            }
        }
    },[socket, messages, setMessages])
}

export default GetNewmessagehook
