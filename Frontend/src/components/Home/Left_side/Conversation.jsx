import React, { useEffect, useState } from "react";
import { useConversatonContext } from "../../../Context/ConversatonContext";
import { useSocketContext } from "../../../Context/SocketContext";

const Conversation = ({user, last}) => {
  const {conversation, setConversation} = useConversatonContext()
  const [select, setSelect] = useState(false)
  const [online, setOnline] = useState(false)
  const {onlineUsers} = useSocketContext()

  useEffect(()=>{
    if(onlineUsers.includes(user._id)){
      setOnline(true)
    }else{
      setOnline(false)
    }
  },[onlineUsers])

  const handleClick = () => {
    setConversation(user)
    console.log(user)
    setSelect(user._id)
  }
  return (
    <>
    <div className={`px-0 mt-3 ${!last? "border-b":""} rounded-sm flex ${select === conversation?._id ? "bg-blue-600" : ""} hover:bg-blue-600 items-center`} onClick={handleClick}>
      <div className={`avatar ${online && "online"} h-16`}>
          <img src="https://api.multiavatar.com/Sanu%20Bond.svg" />
      </div>
      <div className="flex flex-col">
      <label className="label p-3">{user.name}</label>
      <label className="p-2 text-xs">{user.email}</label>
      </div>
    </div>
    </>
  );
};

export default Conversation;
