"use client";

import { Button, Input } from "@nextui-org/react";
import CSS from "./chat.module.css";

import { useEffect, useState } from "react";
import { type Message, continueConversation } from "../_chat/actions";
import { readStreamableValue } from "ai/rsc";
import IndividualMsg from "./IndividualMsg";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function ChatSide() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { messages, newMessage } = await continueConversation([
      ...conversation,
      { role: "user", content: input },
    ]);

    let textContent = "";

    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;

      setConversation([
        ...messages,
        { role: "assistant", content: textContent },
      ]);
    }
    setInput("");
    setLoading(false);
  };
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div>
      <div className={CSS.msgs}>
        <p className={CSS.enviado}>Mensaje enviado</p>
        <p className={CSS.recibido}>Mensaje recibido</p>
        {conversation.map((message, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className={message.role === "user" ? "" : "max-w-[90%]"}
          >
            <IndividualMsg own={message.role} msg={message.content} />
          </div>
        ))}
      </div>
      <div className={CSS.chatfooter}>
        <div className="flex gap-3 m-3">
          <Input
            placeholder="Escribir aquí"
            value={input}
            onKeyDown={handleKeyDown}
            isDisabled={loading}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            size="lg"
          />
          <Button
            size="lg"
            color="success"
            variant="bordered"
            onPress={handleSubmit}
            isDisabled={loading}
            isLoading={loading}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
