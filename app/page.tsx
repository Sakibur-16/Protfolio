import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Quote } from "@/components/sections/Quote";
import { Expertise } from "@/components/sections/Expertise";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Quote />
      <Expertise />
      <SelectedWork />
      <Contact />
    </>
  );
}
