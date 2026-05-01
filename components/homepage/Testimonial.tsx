import Image from "next/image";

const Card = ({
  mainText,
  subText,
  caption,
}: {
  mainText: string;
  subText: string;
  caption: string;
}) => {
  return (
    <div className="border xl:w-95 xl:h-52 lg:w-68 lg:h-36 md:w-64 md:h-34 md:rounded-sm overflow-hidden border-[#E6E6DC] w-full relative">
      <div className="absolute inset-0 bg-black">
        <Image src="/assets/cardbg.svg" alt="bg" height={400} width={600} className="object-cover h-full" />
      </div>
      <div className="absolute inset-0 bg-black/85">
        <div className="h-full w-full flex flex-col items-center justify-between xl:px-14 xl:py-6 lg:px-10 lg:py-5 md:px-8 md:py-4 gap-0">
          <div>
            <h5 className="text-[#DB6B30] xl:text-[48px] md:text-3xl md:leading-5 xl:leading-10 font-sans font-bold">
              {mainText}
            </h5>
            <span className="text-[#DB6B30] xl:text-[20px] lg:text-md leading-tight md:text-sm md:font-medium font-sans font-semibold ">
              {subText}
            </span>
          </div>
          <p className="xl:text-[16px] md:text-[11px] md:font-thin text-xs text-center leading-snug xl:mt-4 lg:mt-2 font-sans font-normal text-[#D9D9D6]">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
};

export function Testimonial() {
  const cards: { mainText: string; subText: string; caption: string }[] = [
    {
      mainText: "300X",
      subText: "Handle Cycles",
      caption:
        "Tested under a 30kg load to ensure\n consistent performance during\n repeated lifting.",
    },
    {
      mainText: "3 FT.",
      subText: "Drop Tested",
      caption:
        "Designed to withstand sudden drops\n and rough baggage handling.",
    },
    {
      mainText: "20 KM",
      subText: "Drum Tested",
      caption:
        "Wheel endurance verified across\n abrasive surfaces for long-distance\n reliability.",
    },
    {
      mainText: "300 KG",
      subText: "Pressure Tested",
      caption:
        "Shell tested under 300 kg of applied\n pressure without cracking or\n structural failure.",
    },
  ];

  return (
    <div className="bg-[#25282A] xl:px-36 xl:py-19 lg:px-26 md:px-24 md:py-14 md:rounded-2xl xl:rounded-3xl p-4 flex flex-col md:flex-row">
      <div className="flex w-[44%] lg:w-[43%] flex-col justify-between">
        <h4 className="font-sans-dirt uppercase  md:text-[52px] md:leading-14 lg:text-[57px] xl:text-[80px] xl:leading-22 lg:leading-16 text-3xl text-[#D9D9D6] ">
          Tested for everyday
          travel use.
        </h4>
        <p className="xl:text-[22px] xl:leading-8 lg:text-[17px] lg:leading-5 md:text-md md:tracking-wide md:font-thin md:leading-5 text-base font-sans font-normal text-white">
          Movato suitcases are tested under controlled conditions to ensure consist performance across repeated trips and regular handling.
          <span className="block mt-4 xl:text-[12px] md:mt-2.5 md:text-[9px] md:font-thin md:tracking-tight">
            * Tests conducted under controlled conditions to simulate real-world
            conditions.
          </span>
        </p>
      </div>
      <div className="flex-1 md:flex flex-row flex-wrap justify-end md:gap-6 xl:gap-7 lg:gap-5 gap-4 mt-4 md:mt-0 ">
        {cards.map((card, index) => (
          <Card key={`testimonial_card_${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}
