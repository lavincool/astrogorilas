import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export default function IndividualCard() {
  return (
    <div>
      <Card
        isFooterBlurred
        className="w-[300px] h-[300px] col-span-12 sm:col-span-5"
      >
        <div className="z-0 w-full h-full">icon</div>
      </Card>
    </div>
  );
}
