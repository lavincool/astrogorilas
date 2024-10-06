"use client";

import { useState } from "react";

import type { ChatGPTMessage } from "./types/openai";
import ChatInput from "./components/ChatInput";
import ChatBox from "./components/ChatBox";

export default function IndexPage() {
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const sendMessageHandler = async (message: string) => {
    const messagesToSend: ChatGPTMessage[] = [
      ...messages,
      { role: "user", content: message },
    ];

    setMessages(messagesToSend);

    try {
      setIsSending(true);
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          messages: messagesToSend,
        }),
      });

      const data = await response.json();

      if (data?.function_call) {
        console.log(data);

        console.log(data?.function_call);
        const functionCall = data.function_call;
        handleFunction(functionCall, setMessages, messagesToSend);
      }

      setMessages([...messagesToSend, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <section className="container relative flex flex-col h-full gap-6 py-10">
      {/* Chatbox */}
      <ChatBox messages={messages} isSending={isSending} />
      {/* Input */}
      <ChatInput handler={sendMessageHandler} />
    </section>
  );
}

const handleFunction = async (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  functionCall: any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setMessages: any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  messagesToSend: any,
) => {
  console.log("FUNCTION CALL", functionCall);
  console.log("messagesToSend", messagesToSend);
  switch (functionCall?.name) {
    case "get_vegetation_days":
      try {
        const functionArguments = JSON.parse(functionCall.arguments);
        const emailResponse = await fetch("/api/data", {
          method: "POST",
          body: JSON.stringify({
            instruction: functionArguments.instruction,
          }),
        });
        const emailData = await emailResponse.json();
        console.log(emailData);
        const functionCallMessage: ChatGPTMessage = {
          role: "assistant",
          content: `Se proceso: ${emailData?.message}`,
        };
        setMessages([...messagesToSend, functionCallMessage]);
      } catch (error) {
        console.log(error);
        const functionCallMessage: ChatGPTMessage = {
          role: "assistant",
          content: "No se pudo procesar el mensaje",
        };
        setMessages([...messagesToSend, functionCallMessage]);
      }
      break;

    default:
      break;
  }
};
