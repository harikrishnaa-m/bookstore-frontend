import React, { useEffect, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { Dropdown, DropdownItem } from "flowbite-react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    if (user) setUserDetails(user);
    if (userToken) setToken(userToken);
  }, []); // only run once

  return (
    <Navbar
      fluid
      rounded
      className="!bg-amber-950 h-20 px-4 py-2 shadow-md z-50 fixed top:0 left:0 w-full "
    >
      <NavbarBrand className="text text-white no-underline" href="#">
        <FaBookReader className="text-4xl mx-3 text-yellow-100" />
        <span className="text-yellow-100 self-center whitespace-nowrap text-xl font-semibold">
          Shelfwise
        </span>
      </NavbarBrand>

      <div className="flex md:order-2">
        {token ? (
          <div className="flex">
            <img
              className="rounded-full h-12 cursor-pointer"
              src={userDetails.profile}
              alt="profile"
              referrerPolicy="no-referrer"
            />
            <Dropdown
              style={{
                outline: "none",
                boxShadow: "none",
              }}
              className="relative right-10 outline-none !focus:outline-none rounded"
              dismissOnClick={false}
            >
              <DropdownItem
                onClick={() => {
                  const user = JSON.parse(
                    sessionStorage.getItem("existingUser")
                  );
                  if (user?.username === "admin") {
                    navigate("/admin-home");
                  } else {
                    navigate("/profile");
                  }
                }}
                className="!text-neutral-800"
              >
                Dashboard
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/login");
                }}
                className="!text-neutral-800"
              >
                Sign out
              </DropdownItem>
            </Dropdown>
          </div>
        ) : (
          <Link to="/login">
            <Button className=" text-neutral-950 rounded bg-yellow-100">
              <CiLogin className="text-2xl me-2" />
              Login
            </Button>
          </Link>
        )}
        <NavbarToggle />
      </div>

      <NavbarCollapse className="mb-3 ">
        <NavbarLink
          as={Link}
          to="/"
          className="text-neutral-800 lg:text-yellow-100"
          active
        >
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/allbooks" className="!text-yellow-100 !mx-2">
          Books
        </NavbarLink>
        <NavbarLink as={Link} to="/careers" className="!text-yellow-100 !mx-6 ">
          Careers
        </NavbarLink>
        <NavbarLink as={Link} to="/contact" className="!text-yellow-100 ">
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;
