import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export default function IndividualCard({
  title,
  icon,
  content,
  state,
}: { title: string; icon: React.ReactNode; content: string; state: string }) {
  return (
    <div>
      <Card
        isFooterBlurred
        className={`w-[300px] h-[240px] col-span-12 sm:col-span-5 border-3 ${getColorState(state)} cursor-pointer`}
        isHoverable
      >
        <CardHeader className="p-2">
          <h3 className={"text-2xl center font-semibold m-auto"}>{title}</h3>
        </CardHeader>
        <div className="m-auto">
          <div
            className={`z-0 w-full m-auto mt-[-10px] ${getTextColorState(state)}`}
          >
            {icon}
          </div>
          <p
            className={
              "text-3xl text-center font-bold bg-green-700 w-full rounded py-2 mb-5"
            }
          >
            {content}
          </p>
        </div>
      </Card>
    </div>
  );
}

const getColorState = (state: string) => {
  switch (state) {
    case "good":
      return "border-green-500";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return "default";
  }
};

const getTextColorState = (state: string) => {
  switch (state) {
    case "good":
      return "text-green-500";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return "default";
  }
};
