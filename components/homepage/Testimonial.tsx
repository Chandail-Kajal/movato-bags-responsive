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
    <div className="border border-[#E6E6DC] w-full py-4 px-6 bg-[url('/assets/cardsbg.svg')] bg-black/80 bg-cover bg-center bg-no-repeat ">
      <div className="flex flex-col items-center">
        <h5 className="text-[#DB6B30] text-[48px] leading-tight font-sans font-bold">
          {mainText}
        </h5>
        <span className="text-[#DB6B30] text-[20px] leading-tight  font-sans font-semibold">
          {subText}
        </span>
      </div>
      <p className="text-[16px] text-center leading-snug mt-4 font-sans font-normal text-[#D9D9D6]">
        {caption}
      </p>
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
    <div className="bg-[#25282A] md:px-22.5 md:py-15 rounded-[30px] p-4 flex flex-col xl:flex-row">
      <div className="flex xl:w-1/2 flex-col justify-between ">
        <h4 className="font-sans-dirt uppercase  md:max-lg:text-4xl lg:max-xl:text-5xl xl:text-[80px] xl:leading-20 text-3xl text-[#D9D9D6] ">
          Tested for everyday
          travel use.
        </h4>
        <p className="xl:text-xl lg:max-xl:text-lg md:max-lg:text-md text-base font-sans font-normal text-white">
          Movato suitcases are tested under controlled conditions <br /> to ensure consist performance across repeated trips and <br /> regular handling.
          <span className="block mt-4 text-xs">
            * Tests conducted under controlled conditions to simulate real-world
            conditions.
          </span>
        </p>
      </div>
      <div className="flex-1 md:grid lg:grid-cols-2 xl:gap-6 gap-4 mt-4 xl:mt-0 ">
        {cards.map((card, index) => (
          <Card key={`testimonial_card_${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}
