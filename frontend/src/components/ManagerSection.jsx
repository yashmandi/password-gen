import React from "react";
import { Link } from "react-router-dom";

const ManagerSection = () => {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative  h-64 overflow-hidden rounded-xl sm:ml-24 shadow-2xl  sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src="icons/secure.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Securely Manage Passwords
              </h2>

              <p className="mt-4 text-gray-300">
                Easily store and manage all your passwords in one place with our <br /><span className="font-bold text-lg text-indigo-400">PassGen Password Manager</span>. Protect
                your data with encrypted storage and a user-friendly interface.
                Access your saved credentials securely from any device.
              </p>
              <Link to="/password-manager">
                <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-lg text-white text-sm mt-6 sm:text-md w-full sm:w-64 font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:shadow-2xl">
                  Secure My Passwords Now!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagerSection;
