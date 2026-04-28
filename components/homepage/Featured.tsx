import Image from "next/image";

const ImageCard = ({
  img,
  imgTitle,
  caption,
}: {
  img: string;
  imgTitle: string;
  caption: string;
}) => {
  return (
    <div className="flex flex-col
     gap-3  md:w-50.5 ">
      <div className="relative md:h-51.5 h-60 overflow-hidden rounded-lg">
        <Image
          src={img}
          alt={imgTitle}
          className="w-full object-cover"
          height={500}
          width={300}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
            maskImage:
              "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        ></div>
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-linear-to-t from-black/70 to-transparent pointer-events-none" />
        <h3 className="absolute bottom-4 left-4 z-10 w-[80%] leading-tight md:text-[24px] font-semibold text-white font-sohne-halbfett antialiased">
          {imgTitle}
        </h3>
      </div>
      <p className="font-sans md:text-[16px] text-[#D9D9D6]">
        {caption}
      </p>
    </div>
  );
};
export function Featured() {
  const features: { img: string; imgTitle: string; caption: string }[] = [
    {
      img: "/assets/images/feature-1.svg",
      imgTitle: "Airport Handling",
      caption:
        "Built to handle constant handling across check-in counters and baggage belts.",
    },
    {
      img: "/assets/images/feature-2.svg",
      imgTitle: "All-Terrain Mobility",
      caption:
        "Designed to roll confidently across uneven pavements and gravel roads.",
    },
    {
      img: "/assets/images/feature-4.svg",
      imgTitle: "Repeated Lifting",
      caption:
        "Engineered for repeated lifting — even when fully packed.",
    },
    {
      img: "/assets/images/feature-3.svg",
      imgTitle: "Long Journeys",
      caption:
        "Designed for consistent performance across years of heavy-duty travel.",
    },
  ];
  return (
    <div className="bg-[#25282A] rounded-[30px] py-25 px-10 flex w-full md:flex-row flex-col justify-between items-center gap-0">
      <div className="flex flex-col gap-4">
        <h4 className="md:text-[44px] text-[#DB6B30] font-semibold font-sohne-dreivierfett uppercase leading-14">
          Engineered for <br /> real-world travel.
        </h4>
        <p className="md:text-[24px] font-sans text-[#D9D9D6]">
          Every Movato component is stress-tested to perform 
          <br/>in high-friction environments  —from cobblestone 
          <br />streets to airport cargo holds.
        </p>
      </div>
      <div className="col-span-2 grid md:grid-cols-4 md:mt-0 mt-4 gap-3 text-white">
        {features.map((f, index) => (
          <ImageCard key={`feature-${index}`} {...f} />
        ))}
      </div>
    </div>
  );
}


