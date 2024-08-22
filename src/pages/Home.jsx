import React from "react";
import Navbar from "../components/Navbar";
import PasswordGeneratorBox from "../components/PasswordGeneratorBox";
import Footer from "../components/Footer";
import Section from "../components/Section";
import BlogSection from "../components/BlogSection";
import Faq from "../components/Faq";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      <Navbar />
      <div className="text-center px-4 sm:px-0">
        <p className="text-3xl sm:text-4xl pt-16 font-bold mt-10 text-white">
          Instantly generate a strong, random
          <br />
          password with{" "}
          <span className="text-[#766cf6] hover:text-indigo-400 font-extrabold transition cursor-default">
            PassGen
          </span>
          🔐
        </p>
        <p className="text-md sm:text-md mt-4 text-gray-400">
          Designed to keep your accounts{" "}
          <span className="text-gray-300 font-semibold">Safe</span> and{" "}
          <span className="text-gray-300 font-semibold">Secure</span>
        </p>
      </div>
      <main className="flex-grow">
        <PasswordGeneratorBox />
        <hr className="border-[#29283c] mt-24" />
      </main>
      <Section />
      <hr className="border-[#29283c] mt-20" />
      <BlogSection />
      <hr className="border-[#29283c] mt-" />

      <Faq />
      <div className="mt-40 border-t border-gray-700">
        <Footer />
      </div>
    </div>
  );
};

export default Home;