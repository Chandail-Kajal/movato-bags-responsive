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
    <div
      className="
        flex flex-col gap-1 
        w-full
        md:w-40
        lg:w-42
        xl:w-50.5
      "
    >
      <div
        className="
          relative overflow-hidden rounded
          h-60
          md:h-35
          lg:h-38 
          xl:h-51.5
        "
      >
        <Image
          src={img}
          alt={imgTitle}
          className="w-full h-full object-cover"
          height={500}
          width={400}
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
        />
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-linear-to-t from-black/70 to-transparent pointer-events-none" />
        <h3
          className="
            absolute bottom-4 left-4 md:left-3 md:bottom-3 z-10 w-[80%]
            font-semibold text-white font-sohne-halbfett antialiased leading-tight
            text-sm
            md:text-base
            lg:text-base
            xl:text-[24px]
          "
        >
          {imgTitle}
        </h3>
      </div>
      <p
        className="
          font-sans text-[#D9D9D6]
          md:ml-2.5
          md:leading-3.5
          md:mt-1.5
          text-[10px]
          xl:text-[16px]
        "
      >
        {caption}
      </p>
    </div>
  );
};

export function Featured() {
  const features: { img: string; imgTitle: string; caption: string }[] = [
    {
      img: "/assets/images/feature-1.svg",
      imgTitle: "Airport",
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
    <div className="bg-[#25282A] md:rounded-2xl xl:py-25 lg:py-18 lg:px-9 md:px-8 md:py-16 xl:px-10 flex w-full md:flex-row flex-col justify-between items-center gap-0">
      <div className="flex flex-col gap-3 md:mr-20 lg:pr-0 md:w-[35%] lg:w-[37%]">
        <h4 className="text-xl [hyphens:none] md:text-[29px] lg:text-3xl xl:text-[44px] text-[#DB6B30] font-semibold font-sohne-dreivierfett uppercase xl:leading-14 md:leading-8">
          Engineered for real&#8209;world travel.
        </h4>
        <p className="text-md md:font-thin md:leading-5 xl:text-[24px] lg:text-lg font-sans text-[#D9D9D6]">
          Every Movato component is stress-tested to perform
          in high-friction environments  —from cobblestone
          streets to airport cargo holds.
        </p>
      </div>
      <div className="col-span-2 grid md:grid-cols-4 md:mt-0 mt-4 gap-2 text-white">
        {features.map((f, index) => (
          <ImageCard key={`feature-${index}`} {...f} />
        ))}
      </div>
    </div>
  );
}


