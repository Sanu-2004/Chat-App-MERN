import React from "react";
import Search from "./Left_side/Search";
import Conversations from "./Left_side/Conversations";
import Header from "./Right_side/Header";
import Massages from "./Right_side/Massages";
import Sendmassage from "./Right_side/Sendmassage";
import { CiLogout } from "react-icons/ci";
import { useConversatonContext } from "../../Context/ConversatonContext";
import { useUsercontext } from "../../Context/UserContext";

const Home = () => {
  const {conversation} = useConversatonContext()
  const {user} = useUsercontext()
  const handleLogout = async () => {
    localStorage.removeItem("chat");
    window.location.reload();
    await fetch("http://localhost:5000/api/auth/logout",{credentials: 'include'})
  };
  return (
    <div className="flex justify-center items-center p-9 min-h-screen">
      <div className="md:w-1/2 sm:w-full h-[80vh] relative p-0 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-500">
        <div className="flex flex-row items-start h-full">
          <div className="flex flex-col justify-start h-full w-2/5 p-2 border-r border-gray-500">
            <Search />
            <div className="divider"></div>
            <div className="p-2 h-full overflow-auto">
              <Conversations />
            </div>
          </div>
          {conversation ?
          (<div className="flex flex-col justify-center w-3/5 h-full border-left-2">
            <Header />
            <div className="h-full w-full overflow-auto">
              <Massages />
            </div>
            <Sendmassage />
          </div>) : (
            <div className="flex flex-col justify-center w-3/5 h-full border-left-2">
              <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-4xl text-gray-400">Welcome {user.name}</h1>
                <h2 className="text-2xl text-gray-400">Select a conversation to start chat</h2>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 p-2">
          <button className="btn rounded-full" onClick={handleLogout}>
            <CiLogout />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
