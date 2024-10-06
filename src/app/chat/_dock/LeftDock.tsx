import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Card, CardBody } from "@nextui-org/react";

export default function LeftDock() {
  return (
    <>
      <div className="absolute bg-gray-100 w-1/4 h-[100vh]">
        <p>LeftDock</p>
        <Card className="m-auto">
          <CardBody className="w-full m-auto">
            <CheckBadgeIcon className="w-24 h-24 mr-2 text-green-400" />
          </CardBody>
        </Card>
      </div>
    </>
  );
}
