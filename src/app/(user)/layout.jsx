"use client";
import "swiper/swiper.min.css";
import { Navbar } from "@/components/Navbar/NavBar";
import AppContextProvider from "@src/context/AppContext";
import { Footer } from "@src/components/Footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <title>MS BUY</title>
        <meta title="description" content="Buy anything online" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="shopping_cart.png"
        />
      </head>
      <body>
        <ClerkProvider>
              <AppContextProvider>
                <Navbar />
                {children}
                <Footer />
              </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
