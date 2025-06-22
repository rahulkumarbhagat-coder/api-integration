import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


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
      <body className={`${inter.className} bg-[#f5f5f5] text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
