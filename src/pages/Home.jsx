import React from 'react';
import Navbar from '../components/Navbar';
import PasswordGeneratorBox from '../components/PasswordGeneratorBox';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen pb-16"> {/* Adjust padding-bottom to avoid overlap with the footer */}
      <Navbar />
      <main className="flex-grow">
        <PasswordGeneratorBox />
      </main>
      <Footer/>
    </div>
  );
};

export default Home;