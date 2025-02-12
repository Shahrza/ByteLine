import React, { useState } from "react";
import { NavLink } from "react-router";

import useStore from "@/store";
import DarkModeToggle from "@/components/common/DarkModeToggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { params, setParams } = useStore();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setParams({
      ...params,
      search: searchInput,
    });
  };

  const handleClear = () => {
    setSearchInput("");
    setParams({ ...params, search: "" });
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
        <NavLink to="/" className="text-2xl font-bold text-blue-500">
          ByteLine
        </NavLink>

        <form onSubmit={handleSubmit} className="mx-4 flex items-center">
          <div className="relative">
            <input
              value={searchInput}
              onChange={handleChange}
              type="input"
              className="px-4 py-2 rounded-lg w-[28vw] md:w-80 rounded-r-none border border-gray-200 dark:border-gray-500 focus:outline-none dark:bg-gray-900 dark:text-white"
              placeholder="Search..."
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute w-5 right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 border border-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg rounded-l-none focus:outline-none cursor-pointer"
          >
            Go
          </button>
        </form>

        <nav className="hidden md:flex items-center space-x-6 ">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-blue-500 dark:text-gray-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-700 hover:text-blue-500 dark:text-gray-200"
          >
            About
          </NavLink>
          <span className="hidden md:block">
            <DarkModeToggle />
          </span>
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
        <nav className="md:hidden bg-white shadow-lg dark:bg-gray-900">
          <NavLink
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 border-t dark:border-gray-700"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 border-t dark:border-gray-700"
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <div className="px-4 py-3 md:hidden shadow-md border-t dark:border-gray-700">
            <DarkModeToggle />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
