import { CheckBadgeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Image } from "@nextui-org/react";

export default function LeftDock() {
  return (
    <>
      <div
        className="absolute text-center w-[150px] h-[100vh]"
        style={{ backgroundColor: "#9B9B9B" }}
      >
        <Image
          src="https://devcloud.raza.cool/astro/iaa.png"
          alt="Imagen xd"
          className="w-[100px] h-[100px] mx-auto mt-3"
        />

        <p className="text-large font-bold center mt-3 border-3 m-3 rounded-lg text-blue-500 border-green-600">
          Accesos
        </p>

        <div className="m-3">
          <Card
            isHoverable
            className="m-auto cursor-pointer flex items-center justify-center"
            style={{
              backgroundColor: "#127F79",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <CardBody className="flex items-center justify-center w-full h-full">
              <CheckBadgeIcon className="w-8 h-8 text-green-500" />
            </CardBody>
          </Card>
        </div>

        <div className="m-3">
          <Card
            isHoverable
            className="m-auto cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-blue-600"
            style={{
              backgroundColor: "#9B9B9B",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <CardBody className="flex items-center justify-center w-full h-full">
              <HeartIcon className="w-8 h-8 text-red-500" />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
