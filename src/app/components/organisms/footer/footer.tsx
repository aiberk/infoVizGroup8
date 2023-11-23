import React from "react";

type Props = {};

const Footer = (props: Props) => {
  const links = ["@2023 ACJR", "Contact", "About"];
  return (
    <footer className="flex justify-center  text-white  h-12 ">
      <div className="w-full max-w-8xl flex flex-row justify-between items-center border-t  px-2 border-white border-opacity-20">
        {" "}
        {links.map((link) => (
          <div
            key={link}
            className="text-white text-opacity-50 hover:text-opacity-100 text-sm">
            {link}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
