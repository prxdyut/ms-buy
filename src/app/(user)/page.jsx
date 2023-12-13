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
      *[_type == "featuredProductsAndCategories"]{
        
    "bannersMain": banner1[] {asset -> {...}},
    "bannersPrimary": banner2[] {asset -> {...}},
        "topCategories": topCategories[]->{
            "id": _id,
            name,
            "slug": slug.current,
            "image": mainPhoto.asset->url,
            
        },
          "bestDeals": bestDeals[]->{
              "id": _id,
              name,
              description,
              category -> {name},
              price,
              "slug": slug.current,
              rating,
              "mainImage": mainImage.asset->url,
              instock,
              badge
          },
          "trendingProducts": trendingProducts[]->{
              "id": _id,
              name,
              description,
              category -> {name},
              price,
              "slug": slug.current,
              rating,
              "mainImage": mainImage.asset->url,
              instock,
              badge
          },
          "mostSellingProducts": mostSellingProducts[]->{
              "id": _id,
              name,
              description,
              category -> {name},
              price,
              "slug": slug.current,
              rating,
              "mainImage": mainImage.asset->url,
              instock,
              badge
          }
      }
  `;

  const getFeaturedItemsAsync = () => {
    return client.fetch(groq`${getAllFeaturedItemsQueries}`);
  };
  const featuredItems = await getFeaturedItemsAsync();
  // return <Loading />
  return (
    <main className="flex flex-col gap-8">
      {JSON.stringify()}
      <Banner aspectRatio={"wide"} banners={featuredItems[0]?.bannersMain} />
      <FeaturedProducts
        title="Most Selling Products"
        products={featuredItems[0]?.mostSellingProducts}
      />
      <Banner aspectRatio={"extra"} banners={featuredItems[0]?.bannersPrimary}  />
      <FeaturedProducts
        title="Best Deals For You"
        products={featuredItems[0]?.bestDeals}
      />
      <EssentialList essentials={featuredItems[0]?.topCategories} title={'Essentials'} />
    </main>
  );
}
