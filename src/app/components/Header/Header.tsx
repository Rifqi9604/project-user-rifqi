import React from "react";
import Links from "./Links/Links";

export default function Header() {
  return (
    <header className="w-full mb-6 flex justify-between items-center py-4 px-12 bg-[#FF6600] shadow-md z-10 fixed">
      <div className="text-xl font-bold text-white">Logo</div>
      <Links />
    </header>
  );
}
