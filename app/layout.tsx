import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home page | NoteHub",
  description:
    "Here you can read basic information about the site, its goals and creators.",
  openGraph: {
    title: "Home page | NoteHub",
    description:
      "Here you can read basic information about the site, its goals and creators.",
    url: "https://notehub.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Just logo NoteHub",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `Home page | NoteHub`,
    description:
      "Here you can read basic information about the site, its goals and creators.",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

const RootLayout = ({ children, modal }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
