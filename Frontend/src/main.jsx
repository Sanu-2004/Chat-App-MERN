import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/UserContext.jsx";
import { ConversatonProvider } from "./Context/ConversatonContext.jsx";
import { MessageProvider } from "./Context/MessagesContext.jsx";
import { SocketProvider } from "./Context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ConversatonProvider>
          <MessageProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </MessageProvider>
        </ConversatonProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
