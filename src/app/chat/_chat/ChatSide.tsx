"use client";

import { Button, Input } from "@nextui-org/react";
import CSS from "./chat.module.css";

import { useEffect, useState } from "react";
import { type Message, continueConversation } from "../_chat/actions";
import { readStreamableValue } from "ai/rsc";
import IndividualMsg from "./IndividualMsg";

export default function ChatSide() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (conversation) {
      setInput("");
    }
  }, [conversation]);
  return (
    <div>
      <div className={CSS.msgs}>
        <p className={CSS.enviado}>Mensaje enviado</p>
        <p className={CSS.recibido}>Mensaje recibido</p>
        {conversation.map((message, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index}>
            <IndividualMsg own={message.role} msg={message.content} />
          </div>
        ))}
      </div>
      <div className={CSS.chatfooter}>
        <div className="flex gap-3 m-3">
          <Input
            placeholder="Escribir aquí"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Button
            color="success"
            variant="bordered"
            onClick={async () => {
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
            }}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
