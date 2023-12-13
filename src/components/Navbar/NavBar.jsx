import { client } from "@utils/sanity.client";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { groq } from "next-sanity";

export const Navbar = async ({ categories }) => {
  const getAllFeaturedItemsQueries = `
  *[_type == "featuredProductsAndCategories"][0].topTexts
`;

  const getTexts = () => {
    return client.fetch(groq`${getAllFeaturedItemsQueries}`);
  };
  const texts = await getTexts();

  return (
    <>
      <div className="fixed z-40 w-screen bg-white ">
        <div className="container mx-auto">
        <div className="hidden lg:block">
          <DesktopNav categories={categories} topText={texts} />
        </div>
        <div className="block lg:hidden">
          <MobileNav categories={categories} topText={texts} />
        </div>
      </div></div>
      <div className="h-[108px]"></div>
    </>
  );
};
