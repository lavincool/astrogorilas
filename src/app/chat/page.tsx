import CSS from "./style.module.css";
import ChatSide from "./_chat/ChatSide";
import LeftDock from "./_dock/LeftDock";

export default function Page() {
  return (
    <div className={`${CSS.chat} w-full`}>
      <LeftDock />
      <ChatSide />
    </div>
  );
}
