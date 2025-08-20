import React from "react";
import {
  Footer as FlowbiteFooter,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
  FooterBrand,
  FooterIcon,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";

function Footer() {
  return (
    <FlowbiteFooter
      container
      style={{ zIndex: "100", position: "relative" }}
      className="!bg-amber-950 text-white rounded-none mt-8 "
    >
      {" "}
      {/* Changed to FlowbiteFooter */}
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FooterBrand name="Shelfwise" className="text-yellow-100">
              <FaBookReader className="text-4xl me-3 text-white" />
              <span className="self-center whitespace-nowrap text-xl font-semibold">
                Shelfwise
              </span>
            </FooterBrand>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              {/* Note: FooterTitle is not directly exported by flowbite-react as a top-level component, 
                  it's usually used within the Footer.LinkGroup context or you might create a custom one.
                  For simplicity, I've just included the title as a div here. 
                  If you need a specific FooterTitle component, you'd define it yourself or use a regular heading.
              */}
              <h3 className="text-sm font-semibold text-white uppercase mb-4">
                About
              </h3>
              <FooterLinkGroup col className="text-white">
                <FooterLink href="#">Shelfwise</FooterLink>
                <FooterLink href="#">Books</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase mb-4">
                Follow us
              </h3>
              <FooterLinkGroup col className="text-white">
                <FooterLink href="#">Instagram</FooterLink>
                <FooterLink href="#">Facebook</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase mb-4">
                Legal
              </h3>
              <FooterLinkGroup col className="text-white">
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        {/* Note: FooterDivider is not directly exported by flowbite-react as a top-level component, 
            it's typically part of the main Footer component's internal structure.
            Using a regular hr for demonstration.
        */}
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            by="Shelfwise™"
            href="#"
            year={new Date().getFullYear()}
            className="text-white"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="#"
              icon={BsFacebook}
              className="text-gray-400 hover:text-white"
            />
            <FooterIcon
              href="#"
              icon={BsInstagram}
              className="text-gray-400 hover:text-white"
            />
            <FooterIcon
              href="#"
              icon={BsTwitter}
              className="text-gray-400 hover:text-white"
            />
            <FooterIcon
              href="#"
              icon={BsGithub}
              className="text-gray-400 hover:text-white"
            />
            <FooterIcon
              href="#"
              icon={BsDribbble}
              className="text-gray-400 hover:text-white"
            />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
}

export default Footer;
