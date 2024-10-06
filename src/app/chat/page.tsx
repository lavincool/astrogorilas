import { Button, Spinner } from "@nextui-org/react";
import CSS from "./style.module.css";

export default function Page() {
  return (
    <div className={`${CSS.chat} m-6`}>
      <h1 className="text-2xl mb-3" style={{ color: "red" }}>
        chat
      </h1>
      <div className={CSS.cuadrado}>cuadradito</div>
      <div className="w-48">
        <Button className="mt-3 w-full" color="success" variant="bordered">
          Click me
        </Button>
      </div>
      <Spinner />
    </div>
  );
}
