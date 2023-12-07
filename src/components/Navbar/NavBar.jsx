import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export const Navbar = ({categories}) => {
  return (
    <>
      <div className="fixed z-40 w-screen bg-white">
        <div className="hidden lg:block">
          <DesktopNav categories={categories} />
        </div>
        <div className="block lg:hidden">
          <MobileNav categories={categories} />
        </div>
      </div>
      <div className="h-[108px]"></div>
    </>
  );
};
