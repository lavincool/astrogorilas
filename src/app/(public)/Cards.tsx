import { Card, CardBody } from "@nextui-org/react";
import IndividualCard from "./components/Card";

export default function Cards() {
  return (
    <div>
      <Card className="m-3 border-3 border-green-500">
        <CardBody className="text-center">
          <p>El cultivo se encuentra bien :)</p>
        </CardBody>
      </Card>
      <div className="flex flex-wrap gap-3 justify-center">
        <IndividualCard />
        <IndividualCard />
      </div>
    </div>
  );
}
