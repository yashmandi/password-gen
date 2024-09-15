import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 sm:p-12 mt-6 text-left text-white">
        {/* About Section */}
        <section id="about" className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">About PassPrompt</h1>
          <p className="text-base sm:text-md mb-4">
            PassPrompt is your go-to tool for generating strong, random passwords effortlessly. Designed for simplicity and security, PassPrompt helps you protect your online accounts by creating robust passwords in an instant.
          </p>
          <p className="text-base sm:text-md">
            Our goal is to make password management easier and more secure. Whether you're an individual looking to enhance your personal security or a business needing to ensure password strength across your team, PassPrompt provides a reliable solution.
          </p>
        </section>

        {/* Features Section */}
        <section id="features" className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-5">
            <li className="mb-2">Generate strong, random passwords with various length and complexity.</li>
            <li className="mb-2">Customize your password with specific criteria to meet your security needs.</li>
            <li className="mb-2">Easy to use with a clean and intuitive interface for quick password generation.</li>
          </ul>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-base sm:text-md mb-4">
            At PassPrompt, your privacy is important to us. We do not collect or store any personal data or passwords. All passwords are generated securely and are not saved or tracked.
          </p>
          <p className="text-base sm:text-md">
            We are committed to safeguarding your information and ensuring that your use of our tool remains private and secure. For further details on our practices, please refer to our full privacy policy.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-base sm:text-md">
            If you have any questions or need assistance, feel free to reach out to us. Our support team is here to help you with any issues or inquiries you may have.
          </p>
          <p className="text-base sm:text-md">
            Email: <a href="mailto:support@passgen.com" className="text-blue-400">support@passgen.com</a>
          </p>
        </section>
      </div>
      <div className="mt-40 border-t border-gray-700">
        <Footer />
      </div>
    </div>
  );
};

export default About;