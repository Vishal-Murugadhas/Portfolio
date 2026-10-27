import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import { CoordinateFooter } from "@/components/CoordinateFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <CoordinateFooter />
    </>
  );
}
