import { Card, CardBody } from "@nextui-org/react";
import IndividualCard from "./components/Card";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function Cards() {
  return (
    <div>
      <Card className="m-3 border-3 border-green-500">
        <CardBody className="text-center">
          <div className="flex align-middle items-center m-auto">
            <CheckBadgeIcon className="w-6 h-6 mr-2 text-green-400" />
            <p className="text-large">El cultivo se encuentra bien :)</p>
          </div>
        </CardBody>
      </Card>
      <div className="flex flex-wrap gap-3 justify-center">
        <IndividualCard />
        <IndividualCard />
      </div>
    </div>
  );
}
