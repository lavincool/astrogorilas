import { Button, Input } from "@nextui-org/react";
import CSS from "../style.module.css";

export default function ChatSide() {
  return (
    <div>
      <p>Mensaje 1</p>
      <p>Mensaje 2</p>
      <div className={CSS.chatfooter}>
        <div className="flex gap-3 m-3">
          <Input placeholder="Escribir aquí" />
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
