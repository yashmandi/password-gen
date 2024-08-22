import React from "react";

const Section = () => {
  return (
    <div>
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Designed for business teams like yours</h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          </div>
          <div className="space-y-8  md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 rounded-xl shadow-gray-900 hover:bg-gradient-to-b from-purple-600 to-indigo-600 shadow-xl ">
              <h3 className="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
              <p className="text-white">Plan it, create it, launch it. Collaborate seamlessly with all  the organization and hit your marketing goals every month with our marketing plan.</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 rounded-xl shadow-gray-900 hover:bg-gradient-to-b from-purple-600 to-indigo-600 shadow-xl ">
              <h3 className="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
              <p className="text-white">Plan it, create it, launch it. Collaborate seamlessly with all  the organization and hit your marketing goals every month with our marketing plan.</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 rounded-xl shadow-gray-900 hover:bg-gradient-to-b from-purple-600 to-indigo-600 shadow-xl ">
              <h3 className="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
              <p className="text-white">Plan it, create it, launch it. Collaborate seamlessly with all  the organization and hit your marketing goals every month with our marketing plan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;