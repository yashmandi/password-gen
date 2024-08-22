import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
        <Navbar />
      <div className="container mx-auto p-12 mt-6 text-left text-white pl-2 pr-44">
        {/* About Section */}
        <section id="about" className="mb-8">
          <h1 className="text-3xl font-bold mb-4">About PassGen</h1>
          <p className="text-md">
            PassGen is your go-to tool for generating strong, random passwords
            effortlessly. Designed for simplicity and security, PassGen helps
            you protect your online accounts by creating robust passwords in an
            instant.
          </p>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <div className="mb-4">
            <h3 className="font-semibold text-md">How does PassGen work?</h3>
            <p>
              PassGen generates random passwords based on the length you choose,
              ensuring they are secure and unique.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-md">
              Can I customize the password length?
            </h3>
            <p>
              Yes, you can select the length of your password to meet specific
              security requirements.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold ">Is my password data stored?</h3>
            <p>
              No, PassGen does not store or retain any generated passwords. They
              are created and used on-the-fly.
            </p>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-md">
            At PassGen, your privacy is important to us. We do not collect or
            store any personal data or passwords. All passwords are generated
            securely and are not saved or tracked.
          </p>
        </section>
      </div>
      <hr className="border-[#29283c] mt-20" />
      <Footer />
    </div>
  );
};

export default About;
