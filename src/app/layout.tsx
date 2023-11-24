import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SelectionProvider, useSelection } from "@/app/context/store";
import "./globals.css";
import Nav from "@/app/components/organisms/nav/nav";
import Footer from "@/app/components/organisms/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Group 8 - InfoViz",
  description: "Tweet Sentiment Analysis around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" px-2 flex flex-col">
        <Nav />
        <SelectionProvider>{children}</SelectionProvider>
        <Footer />
      </body>
    </html>
  );
}
