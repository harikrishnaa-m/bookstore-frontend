import React from "react";
import { FaBookReader } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
function AdminHeader() {
  return (
    <div>
      <header className="flex fixed top-0 w-full  justify-between bg-amber-950 h-20 px-4 py-2 shadow-md items-center z-10">
        <h1 className="flex items-center text-4xl text-yellow-50">
          <FaBookReader className="text-4xl mx-3 text-yellow-100" />
          Shelfwise
        </h1>
        <button className="flex items-center bg-white py-2 px-2 rounded cursor-pointer">
          <IoMdLogOut />
          Logout
        </button>
      </header>
      <marquee
        behavior=""
        direction=""
        className="flex items-center bg-gray-800 w-full text-white font-bold fixed top-20 left-0 h-10 z-10"
      >
        Welcome Admin You are all set to manage the admin section
      </marquee>
    </div>
  );
}

export default AdminHeader;
