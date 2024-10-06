import { Button, Input } from "@nextui-org/react";
import CSS from "./chat.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function ChatSide() {
  return (
    <div>
      <div className={CSS.msgs}>
        <p className={`${CSS.enviado} ${poppins.className}`}>Mensaje enviado</p>
        <p className={`${CSS.recibido} ${poppins.className}`}>
          Mensaje recibido
        </p>
      </div>
      <div className={CSS.chatfooter}>
        <div className="flex gap-3 m-3">
          <Input
            placeholder="Realiza tu pregunta a FAIMER aquí..."
            className={poppins.className}
          />
          <Button
            style={{
              backgroundColor: "#5cc123",
              color: "white",
              fontFamily: "Poppins",
            }}
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}
