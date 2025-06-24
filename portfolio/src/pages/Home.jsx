import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import Services from "./miniComponents/Services"; // ✅ Imported here
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <article className="px-5 mt-24 sm:mt-28 md:mt-32 lg:mt-36 xl:mt-40 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
        
        <div id="hero"><Hero /></div>
        <div id="about"><About /></div>
        <div id="timeline"><Timeline /></div>
        <div id="services"><Services /></div> {/* ✅ Inserted here */}
        <div id="skills"><Skills /></div>
        <div id="portfolio"><Portfolio /></div>
        <div id="myapps"><MyApps /></div>
        <div id="contact"><Contact /></div>
      </article>
    </>
  );
};

export default Home;
