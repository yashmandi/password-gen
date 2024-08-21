import React from "react";
import Navbar from "../components/Navbar";
import PasswordGeneratorBox from "../components/PasswordGeneratorBox";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      <Navbar />
      <div>
        <p className="text-3xl pt-24 font-bold text-center mt-10 text-white">
          Effortlessly create a strong, random password <br />
          with our online generator tool.
        </p>
        <p className="text-lg text-center mt-2 text-gray-300">designed to keep your accounts safe and secure.</p>
      </div>
      <main className="flex-grow">
        <PasswordGeneratorBox />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
