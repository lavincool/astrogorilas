"use client";

import { Button, Input } from "@nextui-org/react";
import CSS from "./chat.module.css";

import { useState } from "react";
import IndividualMsg from "./IndividualMsg";
import { Poppins } from "next/font/google";

import type { ChatGPTMessage } from "./types/openai";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function ChatSide() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const sendMessageHandler = async () => {
    console.log("MESSAGES TO SEND", messages);
    const messagesToSend: ChatGPTMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setInput("");
    console.log(messagesToSend);
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
      console.log("LA DATA SOOOOO", data);
      // Check if it's a function call
      if (data?.function_call) {
        console.log(data);

        console.log(data?.function_call);
        const functionCall = data.function_call;
        handleFunction(functionCall, setMessages, messagesToSend);
        // Send email
      }

      setMessages([...messagesToSend, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessageHandler();
    }
  };
  return (
    <div>
      <div className={`${CSS.msgs}`} style={{ paddingTop: 0 }}>
        <div className={CSS.msgs} style={{ paddingBottom: "70px" }}>
          {messages.length === 0 && !isSending && (
            <div className="m-auto center">
              <IndividualMsg
                own="assistant"
                msg="¡Hola! Soy FAIMER, tu asistente virtual. ¿En qué puedo ayudarte hoy?"
                center
              />
            </div>
          )}

          {messages.map((message, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className={message.role === "user" ? "" : "max-w-[90%]"}
            >
              <IndividualMsg own={message.role} msg={message.content} />
            </div>
          ))}
          {messages.length === 0 && isSending && (
            <IndividualMsg
              own="assistant"
              msg="Estoy procesando tu solicitud..."
              center
            />
          )}
        </div>
      </div>
      <div className={CSS.chatfooter}>
        <div className="flex gap-3 m-3">
          <Input
            placeholder="Escribir aquí"
            value={input}
            onKeyDown={handleKeyDown}
            isDisabled={isSending}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            size="lg"
          />
          <Button
            size="lg"
            color="success"
            variant="bordered"
            onPress={sendMessageHandler}
            isDisabled={isSending}
            isLoading={isSending}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
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
  if (functionCall?.name) {
    try {
      const functionArguments = JSON.parse(functionCall.arguments);
      const response = await fetch("/api/data", {
        method: "POST",
        body: JSON.stringify({
          instruction: functionArguments.instruction,
          type: functionCall?.name,
        }),
      });
      const data = await response.json();
      console.log("LA DATA ESSS", data);
      const functionCallMessage: ChatGPTMessage = {
        role: "assistant",
        content: `${data?.content}`,
      };
      console.log("CALL MSGS", functionCallMessage);
      setMessages([...messagesToSend, functionCallMessage]);
    } catch (error) {
      console.log(error);
      const functionCallMessage: ChatGPTMessage = {
        role: "assistant",
        content: `There is an error. I couldn't send the email. Please try again.`,
      };
      setMessages([...messagesToSend, functionCallMessage]);
    }
  }
};
