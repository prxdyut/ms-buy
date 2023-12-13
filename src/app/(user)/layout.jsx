import localFont from 'next/font/local'
import { Navbar } from "@/components/Navbar/NavBar";
import AppContextProvider from "@src/context/AppContext";
import { Footer } from "@src/components/Footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { groq } from "next-sanity";
import { client } from "@utils/sanity.client";

const ano = localFont({
  src: [
    {
      path: '../../fonts/Ano/AnoEighth-Regular.otf',
      weight: '200',
    },
    {
      path: '../../fonts/Ano/AnoQuarter-Regular.otf',
      weight: '300',
    },
    {
      path: '../../fonts/Ano/AnoRegular-Regular.otf',
      weight: '400',
    },
    {
      path: '../../fonts/Ano/AnoRegular-Regular.otf',
      weight: '500',
    },
    {
      path: '../../fonts/Ano/AnoBold-Regular.otf',
      weight: '600',
    },
    {
      path: '../../fonts/Ano/AnoBlack-Regular.otf',
      weight: '700',
    },
  ],
  variable: '--ano-custom-font',
  
})

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
      <body className={`${ano.variable} ${ano.className} ${ano.style.fontWeight}`}>
        <ClerkProvider>
          <AppContextProvider>
            <Navbar categories={categories} />
            <div className="lg:px-16 min-h-[80vh]">{children}</div>
            <Footer />
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
