import { Box } from "@chakra-ui/react";
import { Search } from "../Search/Search";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export const Navbar = () => {
  return (
    <>
      <div className="fixed z-40 w-screen bg-white">
        <div className="hidden lg:block">
          <DesktopNav />
        </div>
        <div className="block lg:hidden">
          <MobileNav />
        </div>
      </div>
      <div className="h-[108px]"></div>
    </>
  );
};
