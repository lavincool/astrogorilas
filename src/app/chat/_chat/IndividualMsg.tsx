import ReactMarkdown from "react-markdown";
import CSS from "./chat.module.css";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function IndividualMsg({ own, msg, center }: any) {
  if (own === "user") {
    return (
      <div className={CSS.enviado}>
        <ReactMarkdown>{msg}</ReactMarkdown>
      </div>
    );
  }
  return (
    <div className={`${CSS.recibido} ${center ? CSS.centered : ""}`}>
      <ReactMarkdown>{msg}</ReactMarkdown>
    </div>
  );
}
