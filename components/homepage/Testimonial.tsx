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
    <div className="border border-[#E6E6DC] w-full py-4 px-6 bg-cover bg-center bg-no-repeat ">
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
    <div className="bg-[#25282A] md:px-22.5 md:py-15 rounded-[30px] p-4 flex md:flex-row flex-col">
      <div className="flex md:w-1/2 flex-col justify-between ">
        <h4 className="font-sans-dirt uppercase md:text-[80px] leading-20 text-4xl text-[#D9D9D6] ">
          Tested for <br /> everyday <br />
          travel use.
        </h4>
        <p className="text-xl font-sans font-normal text-white">
          Movato suitcases are tested under controlled conditions <br /> to ensure consist performance across repeated trips and <br /> regular handling.
          <span className="block md:mt-4 mt-2 text-xs">
            * Tests conducted under controlled conditions to simulate real-world
            conditions.
          </span>
        </p>
      </div>
      <div className="flex-1 grid md:grid-cols-2 md:gap-6 gap-4 mt-4 md:mt-0 bg-black ">
        {cards.map((card, index) => (
          <Card key={`testimonial_card_${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}
