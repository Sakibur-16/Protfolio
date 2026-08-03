import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Quote } from "@/components/sections/Quote";
import { Expertise } from "@/components/sections/Expertise";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Research } from "@/components/sections/Research";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Experience />
      <Quote />
      <Expertise />
      <SelectedWork />
      <Research />
      <Contact />
    </>
  );
}
