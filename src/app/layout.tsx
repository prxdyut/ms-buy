export const metadata = {
  title: { default: "Gala Eyelashes" },
  description:
    "Crafted from premium, lightweight materials, our eyelashes provide a luxurious feel while remaining comfortable throughout the day.",
  referrer: "origin-when-cross-origin",
  keywords: ["Eyelashes", "Gala Eyelashes", "Gala"],
  creator: "Unicus Creatives",
};
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
