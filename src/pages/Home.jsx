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
        <p className="text-3xl pt-16 font-bold text-center mt-10 text-white">
          Effortlessly create a strong, random<br />
          password with <span className="text-[#4F46E5] hover:text-indigo-400 font-extrabold  transition cursor-default">PassGen</span>🔐
        </p>
        <p className="text-md text-center mt-4 text-gray-400">
          Designed to keep your accounts <span className="text-gray-300 font-semibold">safe</span> and <span className="text-gray-300 font-semibold">secure</span>.
        </p>
      </div>
      <main className="flex-grow">
        <PasswordGeneratorBox />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
