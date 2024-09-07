import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Pricing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center ]">
        <div className="max-w-screen-xl px-4 py-8 pl-1 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {/* Starter Plan */}
            <div className="divide-y divide-gray-200 rounded-2xl shadow-lg transition-all bg-[#1d1d1d] transition-transform transform hover:scale-105">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Starter
                  <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 text-sm text-white">
                  Kickstart your projects with essential features
                </p>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-2xl sm:text-3xl font-bold text-white">
                    7$
                  </strong>
                  <span className="text-sm font-medium text-white">/month</span>
                </p>
                <a
                  className="block rounded-lg btn btn-primary transition-all bg-indigo-500 px- py-3 text-center text-sm font-medium text-white hover:bg-indigo-600 hover:text-[#ffffff] sm:mt-4"
                  href="#"
                >
                  Get Started
                </a>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-lg font-medium text-white sm:text-xl">
                  What's included:
                </p>
                <ul className="mt-2 space-y-2 sm:mt-4">
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">
                      Access to Basic Templates
                    </span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">Standard Support</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">Email support</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-white">Email Support</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-white">Help Center Access</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-white">Community access</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="divide-y divide-gray-200 rounded-2xl transition-all bg-[#1d1d1d] transition-transform transform hover:scale-105">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Pro
                  <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 text-sm text-white">
                  Buy once and get lifetime access.
                </p>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-2xl sm:text-3xl font-bold text-white">
                    12$
                  </strong>
                  <span className="text-sm font-medium text-white">
                    /lifetime
                  </span>
                </p>
                <a
                  className="block rounded-lg btn btn-primary transition-all bg-indigo-500 px- py-3 text-center text-sm font-medium text-white hover:bg-indigo-600 hover:text-[#ffffff] sm:mt-4"
                  href="#"
                >
                  Get Started
                </a>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-lg font-medium text-white sm:text-xl">
                  What's included:
                </p>
                <ul className="mt-2 space-y-2 sm:mt-4">
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">
                      Basic + Advanced Templates
                    </span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">5GB of storage</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">Email support</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">Priority support</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">Help Center Access</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-white">Exclusive offers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;