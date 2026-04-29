import Image from "next/image";

// const ImageCard = ({
//   img,
//   imgTitle,
//   caption,
// }: {
//   img: string;
//   imgTitle: string;
//   caption: string;
// }) => {
//   return (
//     <div className="flex flex-col
//      gap-3 md:max-lg:w-30 lg:max-xl:w-35 xl:w-50.5 ">
//       <div className="relative lg:max-xl:w-30 lg:max-xl:h-30 xl:h-51.5 h-60 overflow-hidden rounded-lg">
//         <Image
//           src={img}
//           alt={imgTitle}
//           className="w-full object-cover"
//           height={500}
//           width={300}
//         />
//         <div
//           className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none"
//           style={{
//             WebkitMaskImage:
//               "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
//             maskImage:
//               "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
//             backdropFilter: "blur(12px)",
//             WebkitBackdropFilter: "blur(12px)",
//           }}
//         ></div>
//         <div className="absolute inset-x-0 bottom-0 h-[80%] bg-linear-to-t from-black/70 to-transparent pointer-events-none" />
//         <h3 className="absolute bottom-4 left-4 z-10 w-[80%] leading-tight text-sm md:max-lg:text-sm lg:max-xl:text-md xl:text-[24px] font-semibold text-white font-sohne-halbfett antialiased">
//           {imgTitle}
//         </h3>
//       </div>
//       <p className="font-sans text-xs lg:text-sm xl:text-[16px] text-[#D9D9D6]">
//         {caption}
//       </p>
//     </div>
//   );
// };

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
        flex flex-col gap-3
        
        w-full
        sm:max-md:w-full
        md:max-lg:w-32
        lg:w-36
        xl:w-[202px]
      "
    >
      {/* Image Container */}
      <div
        className="
          relative overflow-hidden rounded-lg
        
          h-60
          sm:max-md:h-56
          md:max-lg:h-32
          lg:h-36
          xl:h-[206px]
        "
      >
        <Image
          src={img}
          alt={imgTitle}
          className="w-full h-full object-cover"
          height={500}
          width={300}
        />

        {/* Blur Fade */}
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

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

        {/* Title */}
        <h3
          className="
            absolute bottom-4 left-4 z-10 w-[80%]
            font-semibold text-white font-sohne-halbfett antialiased leading-tight
            
            text-sm
            sm:max-md:text-sm
            md:max-lg:text-sm
            lg:text-base
            xl:text-[24px]
          "
        >
          {imgTitle}
        </h3>
      </div>

      {/* Caption */}
      <p
        className="
          font-sans text-[#D9D9D6]
          
          text-xs
          sm:max-md:text-xs
          md:max-lg:text-sm
          lg:text-sm
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
        <h4 className="text-xl md:max-lg:text-2xl lg:max-xl:text-3xl xl:text-[44px] text-[#DB6B30] font-semibold font-sohne-dreivierfett uppercase md:max-lg:leading-8 lg:max-xl:leading-10 xl:leading-14">
          Engineered for <br /> real-world travel.
        </h4>
        <p className="text-md md:max-lg:text-md lg:max-xl:text-lg xl:text-[24px] font-sans text-[#D9D9D6]">
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


