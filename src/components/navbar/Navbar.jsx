import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/svgs/logo.svg";
import Menu from "../../assets/svgs/menu.svg";
import Close from "../../assets/svgs/close.svg";
import Search from "../../assets/svgs/search.svg";
import Profile from "../../assets/svgs/profile.svg";

export default function Navbar() {
  return (
    <nav className="h-[100px] font-normal text-text-200text-base">
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between">
          {/* DESKTOP */}
          <div className="flex items-center justify-between w-full">
            {/* LOGO */}
            <div className="flex-shrink-0">
              <img src={Logo} alt="React Logo" />
            </div>
            {/* DESKTOP TABS */}
            <div className="hidden md:block">
              <div className="flex items-baseline justify-evenly w-full">
                <Link
                  to="/"
                  className="hover:text-text-300 hover:font-bold text-center w-fit"
                >
                  Home
                </Link>
                <Link
                  to="/plants"
                  className="hover:text-text-300 hover:font-bold text-center block"
                >
                  Plants
                </Link>
                <Link
                  to="/garden-supplies"
                  className="hover:text-text-300 hover:font-bold text-center block"
                >
                  Garden supplies
                </Link>
                <Link
                  to="/seeds"
                  className="hover:text-text-300 hover:font-bold text-center block"
                >
                  Seeds
                </Link>
                <Link
                  to="/pots"
                  className="hover:text-text-300 hover:font-bold text-center block"
                >
                  Pots
                </Link>
                <Link
                  to="/contact-us"
                  className="hover:text-text-300 hover:font-bold text-center block"
                >
                  Contact us
                </Link>
              </div>
            </div>
            {/* DESKTOP ICONS */}
            <div className="flex">
              <img
                src={Search}
                alt="Search"
                className="w-[36px] h-[36px] block"
              />
              <img
                src={Profile}
                alt="Profile"
                className="w-[36px] h-[36px] block"
              />
            </div>
          </div>
          {/* MOBILE TABS */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <img src={Menu} alt="Menu" className="w-6 h-6 block" />
              <img src={Close} alt="Close" className="w-6 h-6 hidden" />
            </button>
          </div>
        </div>
      </div>
      {/* MOBILE OPEN TABS BUTTON */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/plants"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Plants
          </Link>
          <Link
            to="/garden-supplies"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Garden supplies
          </Link>
          <Link
            to="/seeds"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Seeds
          </Link>
          <Link
            to="/pots"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Pots
          </Link>
          <Link
            to="/contact-us"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact us
          </Link>
        </div>
      </div>
    </nav>
  );
}
