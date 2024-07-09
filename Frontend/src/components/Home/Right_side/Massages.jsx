import React, { useEffect } from 'react'
import Massage from './Massage'
import { useMessageContext } from '../../../Context/MessagesContext'
import { useConversatonContext } from '../../../Context/ConversatonContext'
import GetNewmessagehook from '../../../Hooks/GetNewMessage.hook'

const Massages = () => {
  const {messages, setMessages} = useMessageContext()
  GetNewmessagehook()
  const {conversation} = useConversatonContext()

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/massage/${conversation?._id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessages()
  }, [conversation])
  return (
    <div className='p-2'>
      {messages.length === 0 && <div className='text-xs text-center text-gray-400'>Send message to start conversation</div>}
      {messages && messages.map((message, index) => {
        return <Massage key={index} message={message} />
      })}
    </div>
  )
}

export default Massages
