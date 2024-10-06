import { Button, Input } from "@nextui-org/react";
import CSS from "./chat.module.css";

export default function ChatSide() {
  return (
    <div>
      <div className={CSS.msgs}>
        <p>Mensaje 1</p>
        <p>Mensaje 2</p>
      </div>
      <div className={CSS.chatfooter}>
        <div className="flex gap-3 m-3">
          <Input placeholder="Escribir aquí" />
          <Button color="success" variant="bordered">
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
