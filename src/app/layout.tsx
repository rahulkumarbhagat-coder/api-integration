import { Metadata } from "next";
import "./globals.css";
import { Audiowide } from "next/font/google";
const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });


export const metadata : Metadata = {
  title: "CyberFlux Shop",
  description: "porduct listing wtih advance ui by Rahul",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${audiowide.className} bg-[#0a0f1a] text-white`}>
        {children}
      </body>
    </html>
  );
}
