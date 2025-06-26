import React, { useState, useEffect, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const ROOTURL = "https://soloprojectchat.onrender.com";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { user, logout } = useAuth0(); // ✅ added logout

  const handleSend = () => {
    if (message != "") {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.sub,
          name: user.nickname,
          content: message,
        }),
      };
      fetch(ROOTURL + "/getmessages", options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request Could Not Be Proccesed!");
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          setMessage("");
        });
    } else {
      alert("Message Cannot Be Empty!");
    }
  };

  function HandeDelete(content) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    };
    fetch(ROOTURL + "/deletemessages", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request Could Not Be Proccessed!");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch(ROOTURL + "/getmessages", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request Could Not Be Proccesed!");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      {/* ✅ Added top-right user info and logout button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-blue-600">Chat Room</h1>
        <div className="flex items-center gap-4">
          <img
            src={user.picture}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-400"
          />
          <span className="text-gray-800 font-semibold">{user.nickname}</span>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="flex-1 w-full overflow-y-auto bg-white rounded-lg p-6 shadow-md space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl max-w-[75%] text-lg ${
              msg.id === user.sub
                ? "bg-blue-100 self-end ml-auto text-right"
                : "bg-gray-200 self-start mr-auto text-left"
            }`}
          >
            <p className="text-gray-700 font-semibold mb-1">{msg.sender}</p>

            <div className="flex justify-between items-center">
              <p className="flex-1">{msg.content}</p>
              {msg.id === user.sub && (
                <button
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => HandeDelete(msg.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex items-center gap-3">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
