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
    <div className="border xl:w-80 lg:w-65 md:w-60 border-[#E6E6DC] w-full py-4 px-6 bg-[url('/assets/cardsbg.svg')] bg-black/80 bg-cover bg-center bg-no-repeat ">
      <div className="flex flex-col items-center">
        <h5 className="text-[#DB6B30] xl:text-[48px] lg:text-2xl md:text-3xl leading-tight font-sans font-bold">
          {mainText}
        </h5>
        <span className="text-[#DB6B30] xl:text-[20px] text-md leading-tight md:text-xs font-sans font-semibold ">
          {subText}
        </span>
      </div>
      <p className="xl:text-[16px] lg:text-sm md:text-[11px] text-xs text-center leading-snug xl:mt-4 lg:mt-2 font-sans font-normal text-[#D9D9D6] md:mt-6">
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
    <div className="bg-[#25282A] xl:px-22.5 xl:py-15 lg:px-20 lg:py-13 md:px-18 md:py-11 rounded-[30px] p-4 flex flex-col md:flex-row">
      <div className="flex md:w-1/2 flex-col justify-between md:gap-12 ">
        <h4 className="font-sans-dirt uppercase  md:text-6xl lg:text-6xl xl:text-[80px] xl:leading-22 lg:leading-14 md:leading-16 text-3xl text-[#D9D9D6] ">
          Tested for everyday
          travel use.
        </h4>
        <p className="xl:text-xl lg:text-lg md:text-md text-base font-sans font-normal text-white">
          Movato suitcases are tested under controlled conditions <br /> to ensure consist performance across repeated trips and <br /> regular handling.
          <span className="block mt-4 text-[8px]">
            * Tests conducted under controlled conditions to simulate real-world
            conditions.
          </span>
        </p>
      </div>
      <div className="flex-1 md:flex flex-row flex-wrap justify-end gap-4 mt-4 md:mt-0 ">
        {cards.map((card, index) => (
          <Card key={`testimonial_card_${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}
