import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Card, CardBody } from "@nextui-org/react";

export default function LeftDock() {
  return (
    <>
      <div className="absolute text-center bg-zinc-800 w-[150px] h-[100vh]">
        <p className="text-large font-bold center mt-3 border-3 m-3 rounded-lg text-green-500 border-green-600">
          Acciones
        </p>
        <div className="m-3">
          <Card isHoverable className="m-auto cursor-pointer py-3">
            <CardBody className="w-full m-auto">
              <CheckBadgeIcon className="w-20 h-20 text-green-400 m-auto" />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
