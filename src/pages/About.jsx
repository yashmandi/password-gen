import React, { useState } from 'react';
import Footer from '../components/Footer';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How does PassGen work?",
      answer: "PassGen generates random passwords based on the length you choose, ensuring they are secure and unique."
    },
    {
      question: "Can I customize the password length?",
      answer: "Yes, you can select the length of your password to meet specific security requirements."
    },
    {
      question: "Is my password data stored?",
      answer: "No, PassGen does not store or retain any generated passwords. They are created and used on-the-fly."
    },
    {
      question: "How secure are the passwords generated?",
      answer: "The passwords are generated using a strong randomization process, making them highly secure."
    },
    {
      question: "Can I use PassGen on mobile devices?",
      answer: "Yes, PassGen is designed to work seamlessly across both desktop and mobile devices."
    },
    {
      question: "What should I do if I forget my password?",
      answer: "Since PassGen doesn't store passwords, make sure to save or copy your generated password securely."
    }
  ];

  return (
    <div className="container mx-auto p-12 pl-36 pr-36 text-left">
      {/* About Section */}
      <section id="about" className="mb-8">
        <h1 className="text-3xl text-white font-bold mb-4">About PassGen</h1>
        <p className="text-md text-white">
          PassGen is your go-to tool for generating strong, random passwords effortlessly. Designed for simplicity and security, PassGen helps you protect your online accounts by creating robust passwords in an instant.
        </p>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="mb-8 ">
        <h2 className="text-2xl font-semibold mb-4 text-white">FAQ</h2>
        {faqItems.map((item, index) => (
          <div key={index} className="mb-4">
            <button
              className="w-full text-left font-semibold text-white hover:bg-indigo-500 py-2 px-4 bg-indigo-600 rounded-t-md focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
            </button>
            {activeIndex === index && (
              <div className=" px-4 py-2 text-black text-md bg-indigo-300 rounded-b-md">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </section>
      
      {/* Privacy Section */}
      <section id="privacy">
        <h2 className="text-2xl font-semibold mb-4 text-white">Privacy Policy</h2>
        <p className="text-lg text-white">
          At PassGen, your privacy is important to us. We do not collect or store any personal data or passwords. All passwords are generated securely and are not saved or tracked.
        </p>
      </section>
    </div>
  );
}

export default About;