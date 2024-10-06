import { Input } from "@nextui-org/react";
import { useState } from "react";

const ChatInput = ({
  handler,
}: {
  handler: (message: string) => Promise<void>;
}) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const message = inputValue.trim();
        if (message) {
          setInputValue("");
          await handler(message);
        }
      }}
      className="sticky flex items-end bottom-4"
    >
      <Input
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        name="message"
        className="placeholder:text-sm bg-background"
        placeholder="Escribir aquí"
      />
    </form>
  );
};

export default ChatInput;
