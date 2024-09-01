import React from "react";

const Footer = () => {
  return (
    <div className="mt-20">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <strong className="text-2xl sm:text-4xl  font-bold text-white">
            Create strong passwords instantly with <span className="font-extrabold text-[#766cf6]">PassGen</span>.
          </strong>
        </div>

        <div className="mt-16 flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto max-w-sm lg:max-w-none text-center lg:text-left">
            <p className="mt-4 text-white text-lg lg:text-lg">
              <span className="font-bold">PassGen🔐</span>: Secure your accounts
              effortlessly with strong, randomly generated passwords from
              PassGen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
            <div>
              <strong className="font-medium text-white text-md">Services</strong>
              <ul className="mt-4 text-sm space-y-1">
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">Marketing</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">Graphic Design</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">App Development</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">Web Development</a></li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-white">About</strong>
              <ul className="mt-4 text-sm space-y-1">
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">About</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">Careers</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">History</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">Our Team</a></li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-white">Support</strong>
              <ul className="mt-4 text-sm space-y-1">
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">FAQs</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">Contact</a></li>
                <li><a className="text-gray-300 hover:text-white font-medium transition-all" href="#">Live Chat</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4"></div>
      </div>
      <p className="text-center text-sm text-white">
        Developed by{" "}
        <a className="text-blue-200 hover:underline font-semibold" href="https://github.com/yashmandi">
          @yashmandi
        </a>
      </p>
    </div>
  );
};

export default Footer;
