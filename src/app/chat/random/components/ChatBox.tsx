"use client";

import { useEffect } from "react";
import type { ChatGPTMessage } from "../types/openai";

import ChatMessage from "./ChatMessage";

const initialMessage: ChatGPTMessage = {
  role: "assistant",
  content: "Hello, I am a chatbot. I am here to help you with your questions.",
};

const ChatBox = ({
  messages,
  isSending,
}: {
  messages: ChatGPTMessage[];
  isSending: boolean;
}) => {
  useEffect(() => {
    console.log("MENSAJES CAMBIADOS", messages);
  }, [messages]);
  return (
    <div className="flex-1 py-6 space-y-8 overflow-y-scroll markdown">
      {[initialMessage, ...messages].map((message, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <ChatMessage key={index + message.role} data={message} />
      ))}
      {isSending && (
        <div className="flex items-center justify-center gap-2 ml-1 max-w-fit">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-sm text-neutral-500">Pensando...</div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
