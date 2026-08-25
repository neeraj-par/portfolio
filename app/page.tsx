import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Engineer from "@/components/Engineer";
import Toolkit from "@/components/Toolkit";
import Story from "@/components/Story";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Portfolio />
        <Engineer />
        <Toolkit />
        <Story />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
