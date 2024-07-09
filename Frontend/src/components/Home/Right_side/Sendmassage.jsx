import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { sendmassagehook } from "../../../Hooks/sendMassage.hook";

const Sendmassage = () => {
  const [massage, setMassage] = useState("");
  const { usesend, loading } = sendmassagehook();
  const handleSend = (e) => {
    e.preventDefault();
    console.log(massage);
    usesend(massage);
    setMassage("");
  };
  return (
    <div className="flex w-full bg-slate-900">
      <form className="w-full form flex" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type massage.."
          value={massage}
          onChange={(e) => setMassage(e.target.value)}
          className="input w-full"
        />
        <button className="btn" type="submit">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </form>
    </div>
  );
};

export default Sendmassage;
