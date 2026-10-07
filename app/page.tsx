import { Hero } from "@/components/site/Hero";
import { Intro } from "@/components/site/Intro";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";
import { Research } from "@/components/site/Research";
import { Experience } from "@/components/site/Experience";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Marquee />
      <Work />
      <Research />
      <Experience />
      <Faq />
      <Contact />
    </>
  );
}
