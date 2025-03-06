import io from "socket.io-client"

import { useState, useEffect, use } from 'react'


const socket = io("/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", receiveMessage)

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages(state => [...state, message]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages(state => [...state, newMessage]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message"
          onChange={e => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.from}: {message.body}</li>
        ))}
      </ul>
    </div>
  )
}