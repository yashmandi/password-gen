import React from "react";

const Section = () => {
  return (
    <div>
      <section className="pt-20">
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
              <h2 className="text-3xl font-bold sm:text-4xl text-white">
                Secure, private, and compliant by design!
              </h2>

              <p className="mt-4 text-white">
                PassGen is a simple and efficient tool for generating strong,
                random passwords to enhance your online security. With
                customizable length options, it ensures you create passwords
                that are secure, protecting your accounts from potential
                threats.
              </p>

              <a
                href="#"
                className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-3 rounded-lg text-white text-base sm:text-md w-52 font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl mt-6"
              >
                Get Started Today
              </a>
            </div>

            <div className="grid  gap-4 sm:grid-cols-3">
              <a
                className="block shadow-2xl hover:shadow-gray-700  shadow-gray-800 transition-all rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 h-52  p-3 pt-8 transition-all cursor-default"
              >
                <h2 className="mt-2 text-xl text-white font-bold">
                  Customizable
                </h2>

                <p className="hidden text-start sm:mt-4 pl-2 sm:block sm:text-sm sm:text-white">
                  Adjust the length of your passwords to meet specific security
                  needs.
                </p>
              </a>

              <a
                className="block shadow-2xl hover:shadow-gray-700  shadow-gray-800 transition-all rounded-xl bg-gradient-to-r from-indigo-800 to-purple-500 h-52  p-3 pt-8 transition-all cursor-default"
              >
                <h2 className="mt-2 text-xl text-white font-bold">Instant</h2>

                <p className="hidden text-start sm:mt-4 pl-2 sm:block sm:text-sm sm:text-white">
                  Generate strong, random passwords instantly with ease.
                </p>
              </a>

              <a
                className="block shadow-2xl hover:shadow-gray-700  shadow-gray-800 transition-all rounded-xl bg-gradient-to-r from-indigo-800 to-purple-500 h-52  p-3 pt-8 transition-all cursor-default"
              >
                <h2 className="mt-2 text-xl text-white font-bold">Secure</h2>

                <p className="hidden text-start sm:mt-4 pl-2 sm:block sm:text-sm sm:text-white">
                  Ensure your passwords are strong and random to protect.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
