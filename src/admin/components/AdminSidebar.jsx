import React from "react";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
function AdminSidebar() {
  return (
    <div>
      <div className="flex w-1/4 flex-col items-center gap-3 bg-cyan-50 min-h-screen fixed top-30 left-0">
        <img
          className="rounded-full w-40 my-3"
          src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
          alt=""
        />
        <p className="font-bold">Juan Mata</p>
        <div className="flex flex-col ">
          <div className="flex items-center space-x-2 my-2">
            <Link className="flex items-center space-x-2" to={"/admin-home"}>
              <button className="flex items-center bg-pink-50 justify-center w-[10rem] text-2xl p-2 rounded shadow-lg cursor-pointer">
                <FaHome className="me-1" />
                Home
              </button>
            </Link>
          </div>

          <div className="flex items-center space-x-2 my-2">
            <Link className="flex items-center space-x-2" to={"/admin-books"}>
              <button className="flex items-center justify-center bg-pink-50 w-[10rem] text-2xl p-2 rounded shadow-lg cursor-pointer">
                <FaBook className="me-1" />
                Books
              </button>
            </Link>
          </div>

          <div className="flex items-center space-x-2 my-2">
            <Link className="flex items-center space-x-2" to={"/admin-careers"}>
              <button className="flex items-center justify-center bg-pink-50 w-[10rem] text-2xl p-2 rounded shadow-lg cursor-pointer">
                <FaLaptopCode className="me-1" />
                Careers
              </button>
            </Link>
          </div>

          <div className="flex items-center space-x-2 my-2">
            <Link
              className="flex items-center space-x-2"
              to={"/admin-settings"}
            >
              <button className="flex items-center justify-center bg-pink-50 w-[10rem] text-2xl p-2 rounded shadow-lg cursor-pointer">
                <IoSettings className="me-1" />
                Settings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
