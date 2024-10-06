import { Card, CardBody, Image } from "@nextui-org/react";
import IndividualCard from "./components/Card";
import {
  CheckBadgeIcon,
  CloudIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

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
        <IndividualCard
          title="Nivel del Riego"
          icon={<CloudIcon className="w-32 h-32" />}
          content={"56%"}
          state="good"
        />
        <IndividualCard
          title="Nivel del Ph"
          icon={<FireIcon className="w-32 h-32" />}
          content={"7.5 ph"}
          state="good"
        />
        <div className="relative">
          <Image src="https://devcloud.raza.cool/astro/plant_emoji_v2.png" />
        </div>
      </div>
    </div>
  );
}
/*
          <p
            className="absolute font-semibold text-2xl border-2 rounded p-2 border-zinc-700 bg-zinc-800 text-white"
            style={{ right: "16.5%", bottom: "23px" }}
          >
            Analizar cultivo
          </p>
*/
