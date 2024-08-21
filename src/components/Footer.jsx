import React from 'react';

const Footer = () => {
  return (
    <footer className="left-0 w-full text-center">
      <p className='text-gray-400 text-sm'>
        Developed by{' '}
        <a
          href="https://github.com/yashmandi"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:underline text-gray-200"
        >
          @yashmandi
        </a>
      </p>
    </footer>
  );
};

export default Footer;