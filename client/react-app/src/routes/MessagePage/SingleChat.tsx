import React, { useContext, useEffect, useRef, useState } from "react";
import { apiRequest } from "../../lib/apiRequst";
import { useLoaderData, useLocation } from "react-router-dom";
import MessageCard from "../../components/messageCard/messageCard";
import { SocketContext } from "../../context/socketContext";

// Utility for generating unique keys (if messageId is missing)
const generateTempId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

interface Message {
  messageId?: string;
  body: string;
  senderId?: string;
  createdAt?: string;
  _tempId?: string; // for socket messages only
}

function MessagePage() {
  const messages = useLoaderData() as Message[];
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const chatId = location.state.chatId;
  const [skmsg, setSkMsg] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [skmsg]);

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data: Message) => {
      setSkMsg((prev) => [
        ...prev,
        { ...data, _tempId: generateTempId() } // add temporary ID
      ]);
    };

    socket.on("chat message", handleIncomingMessage);

    return () => {
      socket.off("chat message", handleIncomingMessage);
    };
  }, [socket]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message")?.toString().trim();

    if (!message) return;

    try {
      await apiRequest.post(`/message/${chatId}`, { message });

      const msgObj: Message = { body: message, _tempId: generateTempId() };

      if (socket) {
        socket.emit("chat message", msgObj);
        
    
      }

      
    } catch (error) {
      console.log("Send error:", error);
    }
  };

  const allMessages = [...messages, ...skmsg];

  return (
    <div className="flex bg-gray-800 h-full flex-col relative">
      <div className="h-[50px] text-white">
        <h2 className="text-2xl relative w-[70%] left-5 top-2">Chat Room</h2>
      </div>

      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col bg-gray-900 w-full h-[580px] overflow-y-scroll px-2 py-4">
          <ul className="flex flex-col gap-5  items-center justify-center">
            {allMessages.filter((message) => message.body && message.body.trim() !== "").map((message) => (
              <li
                key={message.messageId || message._tempId!}
                className="w-[95%] flex items-center justify-center"
              >
                <MessageCard item={message} />
              </li>
            ))}
          </ul>
          <div ref={messageEndRef} />
        </div>

        <form
          className="w-[97%] flex justify-between items-center rounded-2xl absolute bottom-2 bg-gray-700 text-white"
          onSubmit={handleSubmit}
        >
          <textarea
            className="w-full h-[50px] px-4 py-2 rounded-bl-2xl rounded-tl-2xl bg-gray-800 focus:outline-none resize-none"
            name="message" 
            placeholder="Write message here"
          />
          <button
             type="submit"
            className="h-[50px] rounded-br-2xl rounded-tr-2xl bg-blue-500 w-[100px] hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessagePage;
