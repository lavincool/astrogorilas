import { Button, Spinner } from "@nextui-org/react";
import CSS from "./style.module.css";
import ChatSide from "./_chat/ChatSide";

export default function Page() {
  return (
    <div className={`${CSS.chat} w-full`}>
      <ChatSide />
    </div>
  );
}
