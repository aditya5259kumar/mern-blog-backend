import React from "react";
import black_beog_logo from "../assets/63e6fae264e26f6039829955_beog.svg";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container px-8 md:px-20">
        <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:pb-4 pt-8 text-white">
          <div className="">
            <div className="overflow-hidden cursor-pointer invert">
              <img src={black_beog_logo} alt="beog-logo" className="h-10" />
            </div>
            <p className="text-sm lg:pr-15 md:pr-0 my-6 leading-7">
              Lorem Ipsum is simply dummy text the printing and typesetting
              industry has been the industry's standard text ever since.
            </p>
            <div className="flex space-x-4 items-center text-lg mb-8">
              <span className="p-1 text-xl text-white rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaInstagram />
              </span>
              <span className="p-1 text-xl text-white rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaXTwitter />
              </span>
              <span className="p-1 text-xl text-white rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaGithub />
              </span>
              <span className="p-1 text-xl text-white rounded-md hover:-translate-y-1 transition-all ease-in-out duration-200">
                <FaLinkedinIn />
              </span>
            </div>
          </div>

          <div className=" mb-8 ">
            <h5 className="font-bold text-xl mb-6">Explore</h5>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href=""
                className="hover:translate-x-1 transition-all ease-in-out duration-200"
              >
                About Us
              </a>
              <a
                href=""
                className="hover:translate-x-1 transition-all ease-in-out duration-200"
              >
                Contact Us
              </a>
              <a
                href=""
                className="hover:translate-x-1 transition-all ease-in-out duration-200"
              >
                FAQ
              </a>
            </div>
          </div>

          <div className=" mb-8 ">
            <h5 className="font-bold text-xl mb-6">Information</h5>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href=""
                className="hover:translate-x-1 transition-all ease-in-out duration-200"
              >
                Style Guid
              </a>
              <a
                href=""
                className="hover:translate-x-1 transition-all ease-in-out duration-200"
              >
                Changelog
              </a>
              <a
                href=""
                className="hover:translate-x-1 transition-all ease-in-out duration-200"
              >
                Licenses
              </a>
            </div>
          </div>

         
        </div>
      </div>

      <div className="bg-gray-800 text-white text-[15px] px-8 py-7 text-center">
        <p>
          © 2026 <span className="font-semibold">Beog</span>. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
