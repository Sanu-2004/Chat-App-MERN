import { useState } from "react"
import { useConversatonContext } from "../Context/ConversatonContext"
import { useMessageContext } from "../Context/MessagesContext"

export const sendmassagehook = ()=>{
    const [loading, setLoading] = useState(false)
    const {conversation} = useConversatonContext()
    const {messages, setMessages} = useMessageContext()
    const usesend = async (massage) =>{
        setLoading(true)
        try {
            if(!massage) return

            const response = await fetch(`http://localhost:5000/api/massage/send/${conversation._id}`,{
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message : massage
                })
            })
            const data = await response.json()
            setMessages([...messages, data.newMessage])
            console.log(messages)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return {usesend, loading}
}