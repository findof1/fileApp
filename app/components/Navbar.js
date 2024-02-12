import React from "react";

const Navbar = ({ homeRedirect, children }) => {
  return (
    <nav className="z-20 w-screen h-[10vh] border-b-8 border-black bg-gray-700 flex flex-row items-center text-white pl-6">
      <a href={homeRedirect} className="text-2xl">
        Home
      </a>
      <div className="flex flex-row items-center ml-auto mr-5">{children}</div>
    </nav>
  );
};

export default Navbar;
