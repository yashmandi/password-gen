import React from "react";

const Section = () => {
  return (
    <div>
      <section className="mt-16">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16 mx-auto text-center">
            <h2 className="text-xl mb-2 sm:text-3xl md:text-4xl tracking-tight font-extrabold text-center text-white">
              Built for security-conscious individuals like you.
            </h2>
            <p className="text-gray-500 sm:text-lg dark:text-gray-400">
              At PassGen, we prioritize robust encryption and user-friendly design to generate strong, reliable passwords that keep your accounts safe and your mind at ease.
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 sm:p-8 md:p-10 rounded-xl shadow-gray-900 hover:bg-gradient-to-b from-purple-700 to-indigo-500 shadow-xl">
              <h3 className="text-lg sm:text-xl mb-2 font-bold dark:text-white">Customizable</h3>
              <p className="text-sm sm:text-base">
                Easily adjust the length of your passwords to meet specific security requirements or personal preferences.
              </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 sm:p-8 md:p-10 rounded-xl shadow-gray-900 hover:bg-gradient-to-b from-purple-700 to-indigo-500 shadow-xl">
              <h3 className="text-lg sm:text-xl mb-2 font-bold dark:text-white">Instant</h3>
              <p className="text-sm sm:text-base">
                Generate strong, random passwords instantly to ensure your accounts remain secure without any hassle.
              </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 sm:p-8 md:p-10 rounded-xl shadow-gray-900 hover:bg-gradient-to-b from-purple-700 to-indigo-500 shadow-xl">
              <h3 className="text-lg sm:text-xl mb-2 font-bold dark:text-white">Secure</h3>
              <p className="text-sm sm:text-base">
                Ensure your passwords are strong and random to protect your accounts effectively.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;