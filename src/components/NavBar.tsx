"use client";

import NavButton from "./NavButton";
import NavContent from "./NavContent";
import { Josefin_Sans } from "next/font/google";

const fnt_bold = Josefin_Sans({ subsets: ["latin"], weight: "700" });

export default function NavBar() {
  return (
    <>
      <div className="w-full h-12 mb-4 bg-accent flex justify-start items-center">
        <div className="sm:hidden">
          <NavButton />
        </div>
        <div className={fnt_bold.className}>
          <p className="box text-xl mx-2">SHOPPING APP</p>
        </div>
      </div>
      <div className="hidden absolute left-0 mt-5 pl-2 w-1/6 sm:block">
        <NavContent />
      </div>
    </>
  );
}
