'use client';
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";

const HeaderMobile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-screen bg-white z-20 laptop:hidden rounded-b-3xl top-0 fixed mt-0 pt-0  border-b-darkGold">
      <div className="flex justify-between items-center p-4 ">
        {/* Logo */}
        <img src="/aspectailogo.png" className=" w-28 h-auto font-bold text-lg text-neutral-700"></img>

        {/* Mobile Menu Button */}
        <button
          className="text-neutral-700 p-2 rounded-md"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? (
            <HiXMark className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-30`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-neutral-700 p-2 rounded-md"
            onClick={handleMenuToggle}
          >
            <HiXMark className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col items-center space-y-8 p-4 pt-8">
          <li>
            <a
              href="#about"
              className="text-neutral-700 font-medium py-2 w-full text-center hover:bg-neutral-100 rounded-md"
              onClick={handleCloseMenu}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-neutral-700 font-medium py-2 w-full text-center hover:bg-neutral-100 rounded-md"
              onClick={handleCloseMenu}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#stats"
              className="text-neutral-700 font-medium py-2 w-full text-center hover:bg-neutral-100 rounded-md"
              onClick={handleCloseMenu}
            >
              Stats
            </a>
          </li>
        
          <li>
            <a
              href="#contact"
              className="text-neutral-700 font-medium py-2 w-full text-center hover:bg-neutral-100 rounded-md"
              onClick={handleCloseMenu}
            >
              Contact Me
            </a>
          </li>
          
          <Link href='#pricing ' target='__blank' className="px-4 py-2 text-sm font-medium text-white bg-chemisphere rounded-md hover:bg-black hover:text-white transition-colors">
          Explore plans
        </Link>
        </ul>
      </div>
    </header>
  );
};

export default HeaderMobile;