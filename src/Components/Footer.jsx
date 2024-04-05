import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const currentDate = new Date();
  const date = currentDate.getFullYear();

  return (
    <>
      <footer className="relative bottom-0 h-[10vh] py-5 sm:px-20 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800">
        <section className=" text-2xl">
          <p>Copyright {date} All right reserved</p>
        </section>
        <section className=" flex items-center justify-between text-2xl text-white gap-5">
          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
            <BsFacebook />
          </a>

          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
            <BsInstagram />
          </a>

          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
            <BsLinkedin />
          </a>

          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
            <BsTwitter />
          </a>
        </section>
      </footer>
    </>
  );
}
export default Footer;
