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



const Section = ({ children }: PropsWithChildren) => {
  return <div className="px-[40px]">{children}</div>;
};

export default async function Home() {
  const slides = await fetchPublicData("hero")
  return (
    <div className="min-h-screen bg-white w-full flex flex-col relative gap-[40px]">
      <Header />
      <Section>
        <HeroCarousel slides={slides} />
      </Section>

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
      <Section>
        <TestimonialSection />
      </Section>
      <Section>
        <FAQ />
      </Section>
      <Section>
        <HelpSection />
      </Section>
      <Footer />
    </div>
  );
}
