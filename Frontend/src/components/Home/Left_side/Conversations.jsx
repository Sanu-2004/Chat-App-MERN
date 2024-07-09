import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { useConversatonContext } from '../../../Context/ConversatonContext'
import toast from 'react-hot-toast'

const Conversations = () => {
  const [loading, setLoading ] = useState(false)
  const [allusers, setAllusers] = useState([])
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:5000/api/users/',{
          credentials: 'include'
        })
        const data = await response.json()
        if(data.message){
          toast.error(data.message)
          return
        }
        setAllusers(data)
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    getConversations()
  }, [])
  return (
    <div className='text-white'>
      {loading && <span className='loading loading-dots loading-md'></span> }
        {allusers.map((user, i) => {
          return <Conversation key={i} user={user} last={(allusers.length -1)==i} />
        })}
        
    </div>
  )
}

export default Conversations
