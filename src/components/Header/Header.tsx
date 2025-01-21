import React, { useState } from "react";
import useStore from "@/store/header";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { setSearch } = useStore();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(searchInput);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <a href="/" className="text-2xl font-bold text-blue-500">
          ByteLine
        </a>

        <form onSubmit={handleSubmit} className="mx-4">
          <input
            value={searchInput}
            onChange={handleChange}
            type="input"
            className="px-4 py-2 rounded-lg rounded-r-none w-80 border border-gray-200 focus:outline-none"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-blue-500 border border-blue-500 text-white px-4 py-2 rounded-lg rounded-l-none focus:outline-none"
          >
            Go
          </button>
        </form>

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
