import { Banner } from "@src/features/home/Banner";
import { FeaturedProducts } from "@src/features/home/FeaturedProducts";
import { TopCategories } from "@src/features/home/TopCategories";
import { IFeaturedItems } from "@src/model";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import EssentialList from "@/features/home//EssentialList";
import { GridBanner } from "@/features/home//GridBanner";
import { Loading } from "@src/components/Loading/Loading";

export const revalidate = 2;

export default async function Home() {
  const getAllFeaturedItemsQueries = `
      *[_type == "category"]{
            "id": _id,
            name,
            "slug": slug.current,
            "image": mainPhoto.asset->url,
        
      }
  `;

  const getFeaturedItemsAsync = () => {
    return client.fetch(groq`${getAllFeaturedItemsQueries}`);
  };
  const featuredItems = await getFeaturedItemsAsync();

  return (
    <main className="flex flex-col mt-4 px-4">
    <div className="text-center py-2 mt-4">
      <p className=" text-xl">All Categories</p>
    </div>
      <EssentialList essentials={featuredItems} />
    </main>
  );
}
