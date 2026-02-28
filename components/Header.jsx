'use client';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [navigationMenuOpen, setNavigationMenuOpen] = useState(false);
  const [navigationMenu, setNavigationMenu] = useState('');
  const [navigationMenuCloseTimeout, setNavigationMenuCloseTimeout] = useState(null);

  const navigationMenuLeave = () => {
    setNavigationMenuCloseTimeout(
      setTimeout(() => {
        setNavigationMenuOpen(false);
        setNavigationMenu('');
      }, 200)
    );
  };

  const navigationMenuReposition = (navElement) => {
    clearTimeout(navigationMenuCloseTimeout);
    const dropdown = document.querySelector('#navigationDropdown');
    dropdown.style.left = `${navElement.offsetLeft}px`;
    dropdown.style.marginLeft = `${navElement.offsetWidth / 2}px`;
  };

  return (
    <nav className="z-30 laptop:flex fixed pb-8  items-center top-0 justify-between w-full mobile:hidden px-12 pt-8 mt-0 bg-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <img
            src="/aspectailogo.png"
            alt="Logo"
            className="h-10 cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-12">
        <li>
          <a
            href="#about"
            className="text-sm font-medium text-gray-900 hover:text-chemisphere transition-colors"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-sm font-medium text-gray-700 hover:text-chemisphere transition-colors"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#stats"
            className="text-sm font-medium text-gray-700 hover:text-chemisphere transition-colors"
          >
            Stats
          </a>
        </li>
        {/* <li>
          <button
            className="text-sm font-medium text-gray-700 hover:text-chemisphere transition-colors flex items-center"
            onMouseOver={(e) => {
              setNavigationMenuOpen(true);
              navigationMenuReposition(e.target);
              setNavigationMenu('getting-started');
            }}
            onMouseLeave={navigationMenuLeave}
          >
            <span>JEE</span>
          </button>
        </li>
        <li>
          <button
            className="text-sm font-medium text-gray-700 hover:text-chemisphere transition-colors flex items-center"
            onMouseOver={(e) => {
              setNavigationMenuOpen(true);
              navigationMenuReposition(e.target);
              setNavigationMenu('learn-more');
            }}
            onMouseLeave={navigationMenuLeave}
          >
            <span>NEET</span>
          </button>
        </li> */}
        <li>
          <a
            href="#contact"
            className="text-sm font-medium text-gray-700 hover:text-chemisphere transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Social Media & Button Section */}
         {/* LinkedIn */}

         <SignedIn>
        <UserButton />
      </SignedIn>
          
      <div className="flex items-center space-x-8 mobile:hidden laptop:block text-gray-500">
        <Link href="#pricing" target='__blank' className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-black hover:text-white transition-colors">
          Explore plans →
        </Link>
      </div>

      {/* Dropdown Section */}
      <div
        id="navigationDropdown"
        className={`absolute top-0 mt-6 transition ease-in-out duration-200  -translate-x-1/2 translate-y-11 ${
          navigationMenuOpen ? 'block' : 'hidden'
        }`}
        onMouseOver={() => clearTimeout(navigationMenuCloseTimeout)}
        onMouseLeave={navigationMenuLeave}
      >
        <div className="flex justify-center w-auto h-auto overflow-hidden bg-chemisphere rounded-md  ">
          {navigationMenu === 'getting-started' && (
            <div className="flex items-stretch justify-center w-full max-w-2xl p-6 gap-x-3">
              <div className="w-72">
                <a href="#projects" className="block px-3.5 py-3 text-white text-sm rounded">
                  Projects
                </a>
                <a href="#patents" className="block px-3.5 py-3 text-white text-sm rounded">
                  Patents
                </a>
              </div>
            </div>
          )}
          {navigationMenu === 'learn-more' && (
            <div className="flex items-stretch justify-center w-full p-6">
              <div className="w-72">
                <a href="#bodies" className="block px-3.5 py-3 text-sm rounded hover:bg-neutral-100">
                  Professional Bodies
                </a>
                <a href="#committees" className="block px-3.5 py-3 text-sm rounded hover:bg-neutral-100">
                  Committees
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;