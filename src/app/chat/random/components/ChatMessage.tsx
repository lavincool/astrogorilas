import ReactMarkdown from "react-markdown";

import type { ChatGPTMessage } from "../types/openai";
import { Avatar } from "@nextui-org/react";

const ChatMessage = ({ data }: { data: ChatGPTMessage }) => {
  const isAssistant = data.role === "assistant";
  return (
    <div className="flex items-start gap-4 pl-1">
      {/* Avatar */}
      <Avatar
        className={`border-none text-xs font-bold ring-2 ring-offset-0 ${
          !isAssistant ? "ring-neutral-500" : "ring-emerald-500"
        }`}
      >
        {isAssistant ? "AI" : "YOU"}
      </Avatar>
      {/* Message */}
      <div className="mt-2">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
