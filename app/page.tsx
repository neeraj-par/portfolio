import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Engineer from "@/components/Engineer";
import Toolkit from "@/components/Toolkit";
import Story from "@/components/Story";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Home page: assembles every section, with a skip link for keyboard users.
const Home = () => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
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
};

export default Home;
