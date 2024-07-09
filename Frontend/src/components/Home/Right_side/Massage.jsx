import React, { useEffect, useRef } from "react";
import { useConversatonContext } from "../../../Context/ConversatonContext";

const Massage = ({message}) => {
  const {conversation} = useConversatonContext()
  let sender = false
  if(message){
  sender = (conversation._id === message.senderId? false : true)
  }
  const msg = useRef(null)
  useEffect(() => {
    msg.current.scrollIntoView({ behavior: "smooth" });
  }, [message])

  return (
    <div className="w-full" ref={msg}>
      <div className={`chat chat-${message && (sender? "end": "start")} `}>
        <div className={`chat-bubble chat-bubble-${message && (sender? "primary" : "secondary")}`}>
          {message && message.message}
        </div>
      </div>
    </div>
  );
};

export default Massage;