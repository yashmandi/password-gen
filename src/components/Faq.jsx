import React, { useState } from 'react';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: "How does the password generator work?",
            answer: "The password generator creates secure, random passwords based on your selected length and character requirements, ensuring high entropy and strength."
        },
        {
            question: "Can a strong password be hacked?",
            answer: "While a strong password significantly reduces the risk, no password is completely immune to hacking. Using complex and unique passwords enhances security."
        },
        {
            question: "Can I use the password generator to create a user name?",
            answer: "No, PassGen is designed specifically for generating passwords. For usernames, consider using a separate tool or manual creation."
        },
        {
            question: "How do you manage your passwords with a password manager?",
            answer: "A password manager securely stores and organizes your passwords, allowing you to access them easily and use complex, unique passwords for each account."
        },
        {
            question: "Is PassGen password generator safe?",
            answer: "Yes, PassGen employs strong randomization techniques to ensure that passwords are secure and not predictable."
        },
        {
            question: "Is the functionality different in the online generator and in the PassGen app?",
            answer: "Both the online generator and the PassGen app offer the same core functionality. The app may provide additional features like saving preferences or integration options."
        }
    ];

    return (
        <div className="container mx-auto p-6 mt-20">
            <section id="faq">
                <h2 className="text-3xl font-bold mb-12 text-white text-center">Frequently Asked Questions</h2>
                {faqItems.map((item, index) => (
                    <div key={index} className="mb-4">
                        <button
                            className="w-full md:w-3/5 text-center font-semibold py-2 px-4 bg-[#222931] text-white rounded-lg focus:outline-none transition-all duration-300 hover:bg-[#161b20]"
                            onClick={() => toggleAccordion(index)}
                        >
                            {item.question}
                            <div
                                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-screen' : 'max-h-0'
                                    }`}
                                style={{ maxHeight: activeIndex === index ? '100px' : '0' }}
                            >
                                <div className="p-3 text-center rounded-lg text-white">
                                    {item.answer}
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Faq;