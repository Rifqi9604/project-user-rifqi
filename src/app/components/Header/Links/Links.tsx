"use client";
import React, { useState } from "react";
import HeaderLinks from "./HeaderLinks/HeaderLinks";

const Links = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Ideas", path: "/ideas" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Desktop menu */}
      <div className="hidden md:flex space-x-4 text-white">
        {links.map((link) => (
          <HeaderLinks key={link.name} item={link} />
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 z-50 relative text-white"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="bg-[#FF6600] flex flex-col items-center justify-center h-full">
          {links.map((link) => (
            <div key={link.name} className="text-center w-full p-4 text-white">
              <HeaderLinks
                item={link}
                onLinkClick={() => setIsMenuOpen(false)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Links;
