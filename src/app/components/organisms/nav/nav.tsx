import React from "react";

import Logo from "@/app/components/organisms/logo/logo";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  const items = [
    { title: "About", link: "/about" },
    { title: "Brush & Link", link: "/" },
    { title: "Map", link: "/map" },
  ];

  return (
    <nav className="row-auto text-white w-full flex justify-center h-20">
      <div className="text-white w-full max-w-8xl  border-b border-white border-opacity-20 flex flex-row justify-between items-center">
        <Logo />
        <div className="flex flex-row gap-8 items-center mr-[120px]">
          {items.map((navItem, id) => (
            <Link
              href={navItem.link}
              key={navItem.link + id}
              className="text-white text-opacity-50 hover:text-opacity-100">
              {navItem.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
