import React from "react";

import Logo from "@/app/components/organisms/logo/logo";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  const navItems = ["Visualizations", "About", "Team", "Samples"];
  return (
    <nav className="row-auto text-white w-full flex justify-center h-20">
      <div className="text-white w-full max-w-8xl  border-b border-white border-opacity-20 flex flex-row justify-between items-center">
        <Logo />
        <div className="flex flex-row gap-8 items-center">
          {navItems.map((navItem) => (
            <Link
              href={`/${navItem.toLowerCase()}`}
              key={navItem}
              className="text-white text-opacity-50 hover:text-opacity-100">
              {navItem}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
