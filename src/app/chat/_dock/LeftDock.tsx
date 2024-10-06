import { CheckBadgeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Image } from "@nextui-org/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});

export default function LeftDock() {
  return (
    <>
      <div className="absolute text-center w-[100px] h-[100vh] bg-zinc-900">
        <div className="m-3">
          <Image
            src="https://devcloud.raza.cool/astro/iaa.png"
            width={66}
            height={61}
            alt="Imagen xd"
            style={{ borderRadius: "0" }}
          />
          <p
            className={`text-large ${poppins.className} mt-3 text-white border-green-600`}
          >
            FAIMER
          </p>
        </div>

        <div className="m-3">
          <Card
            isHoverable
            className="m-auto cursor-pointer flex items-center justify-center border-none transition-transform duration-200 transform active:scale-95 hover:shadow-lg"
            style={{
              backgroundColor: "#7FDE4A",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <CardBody className="flex items-center justify-center w-full h-full p-0">
              <Image
                src="https://devcloud.raza.cool/astro/amor.png"
                width={40}
                height={40}
                alt="Descripción de la imagen"
                style={{
                  objectFit: "contain",
                  borderRadius: "10%",
                }}
              />
            </CardBody>
          </Card>
        </div>

        <div className="m-3">
          <Card
            isHoverable
            className="m-auto cursor-pointer flex items-center justify-center border-none transition-transform duration-200 transform active:scale-95 hover:shadow-lg"
            style={{
              backgroundColor: "#19AFA8",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <CardBody className="flex items-center justify-center w-full h-full p-0">
              <Image
                src="https://devcloud.raza.cool/astro/regando-plantas.png"
                width={35}
                height={35}
                alt="Descripción de la imagen"
                style={{
                  objectFit: "contain",
                  borderRadius: "10%",
                }}
              />
            </CardBody>
          </Card>
        </div>

        <div className="m-3">
          <Card
            isHoverable
            className="m-auto cursor-pointer flex items-center justify-center transition-transform duration-200 transform active:scale-95 hover:shadow-lg"
            style={{
              backgroundColor: "#C18243",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <CardBody className="flex items-center justify-center w-full h-full p-0">
              <Image
                src="https://devcloud.raza.cool/astro/saco.png"
                width={35}
                height={35}
                alt="Descripción de la imagen"
                style={{
                  objectFit: "contain",
                  borderRadius: "10%",
                }}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
