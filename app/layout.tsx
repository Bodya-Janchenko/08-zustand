import type { Metadata } from "next";

import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import React from "react";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Created by GoIT",
  openGraph: {
    title: "NoteHub",
    description: "Created by GoIT",
    url: "https://notehub.com",
    images: [
      {
        url: "/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
