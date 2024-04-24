import React from "react";
import {Navbar, NavbarContent} from "@nextui-org/react";
import Logo from "/Globant.png"

export default function Header() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarContent  justify="start">
        <img src={Logo} className="flex justify-startxs items-start max-w-[10rem]" alt="logo"/>
      </NavbarContent>
    </Navbar>
  );
}
