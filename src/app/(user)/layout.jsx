import "swiper/swiper.min.css";
import { Navbar } from "@/components/Navbar/NavBar";
import AppContextProvider from "@src/context/AppContext";
import { Footer } from "@src/components/Footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { groq } from "next-sanity";
import { client } from "@utils/sanity.client";

export default async function RootLayout({ children }) {
  const getAllCategoriesQueries = `
  *[_type == "category"] {
      "id": _id,
      name,
      "slug": slug.current,
  }
`;

  const getCategoriesAsync = () => {
    return client.fetch(groq`${getAllCategoriesQueries}`);
  };

  const categories = await getCategoriesAsync();
  return (
    <html lang="en">
      <head>
        <title>MS BUY</title>
        <meta title="description" content="Buy Eyelashes online" />
      </head>
      <body>
        <ClerkProvider>
          <AppContextProvider>
            <Navbar categories={categories} />
            <div className="lg:px-16">{children}</div>
            <Footer />
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
