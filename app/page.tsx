import { Hero } from "@/components/site/Hero";
import { Work } from "@/components/site/Work";
import { Research } from "@/components/site/Research";
import { Experience } from "@/components/site/Experience";
import { Contact } from "@/components/site/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Research />
      <Experience />
      <Contact />
    </>
  );
}
