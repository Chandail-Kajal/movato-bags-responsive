/* eslint-disable @typescript-eslint/no-unused-vars */
import Footer from "@/components/footer";
import Header from "@/components/header";
import FAQ from "@/components/homepage/FAQ";
import { Featured } from "@/components/homepage/Featured";
import HelpSection from "@/components/homepage/helpSection";
import { HeroCarousel } from "@/components/homepage/HeroCarousel";
import { ShopYourLuggage } from "@/components/homepage/ShopYourLuggage";
import SupportSection from "@/components/homepage/supportSection";
import { Testimonial } from "@/components/homepage/Testimonial";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import { fetchPublicData } from "@/lib/api";
import { PropsWithChildren } from "react";
import { seed } from "@/lib/seed";



const Section = ({ children }: PropsWithChildren) => {
  return <div className="2xl:px-10 xl:px-10 lg:px-8 md:px-6 px-4">{children}</div>;
};

export default async function Home() {
  const slides = await fetchPublicData("hero")
  
  return (
    <>
      <Header />
      <div className="lg:mt-6 md:mt-4 lg:mb-8 xl:mb-10 md:mb-7 mt-4 mb-6">
        <Section>
          <HeroCarousel slides={slides} />
        </Section>
      </div>
      <div className="min-h-screen bg-white w-full flex flex-col relative lg:gap-8 xl:gap-10 md:gap-10 gap-6">
        <Section>
          <Featured />
        </Section>

        <Section>
          <ShopYourLuggage />
        </Section>

        <Section>
          <Testimonial />
        </Section>
        <Section>
          <SupportSection />
        </Section>

        <TestimonialSection />

        <Section>
          <FAQ />
        </Section>
        <Section>
          <HelpSection />
        </Section>
        <Footer />
      </div>
    </>
  );
}
