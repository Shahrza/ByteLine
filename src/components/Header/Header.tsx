import React, { useState } from "react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <a href="/" className="text-2xl font-bold text-blue-500">
          ByteLine
        </a>

        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="text-gray-700 hover:text-blue-500">
            Home
          </a>
          <a href="#about" className="text-gray-700 hover:text-blue-500">
            About
          </a>
          <a href="#services" className="text-gray-700 hover:text-blue-500">
            Services
          </a>
          <a href="#contact" className="text-gray-700 hover:text-blue-500">
            Contact
          </a>
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <a
            href="#home"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            About
          </a>
          <a
            href="#services"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Services
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
