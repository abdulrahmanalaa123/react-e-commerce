import React from "react";

// IMAGES
import Logo from "../../assets/svgs/logo.svg";
// STYLES
import CartButton from "./CartButton";
import AuthButtons from "./AuthButtons";
import NavSideBar from "./NavSidebar";
import LinksComponent from "./NavLinks";

export default function Navbar() {
  return (
    <nav className="h-[100px] font-normal text-text-200 text-base">
      <div className="flex items-center justify-between h-full">
        {/* DESKTOP */}
        <div className="flex items-center justify-between w-full">
          {/* LOGO */}
          <div className="hidden md:block flex-shrink-0">
            <img src={Logo} alt="React Logo" />
          </div>
          <NavSideBar />
          {/* DESKTOP TABS */}
          <div className="hidden md:block  w-[700px]">
            <div className="flex items-baseline justify-evenly">
              <LinksComponent />
            </div>
          </div>
          {/* DESKTOP ICONS */}
          <div className="flex gap-2">
            <AuthButtons />
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
