import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page not found | NoteHub",
  description:
    "This page does not exist. You may have mistyped the address or the page has been removed.",
  metadataBase: new URL("https://notehub.com"),
  alternates: {
    canonical: "/not-found",
  },
  openGraph: {
    title: "404 Page not found | NoteHub",
    description:
      "Sorry, the page you are looking for does not exist. Please return to the NoteHub homepage.",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://notehub.com/error-404.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub U+002D Page not found",
      },
    ],
    type: "website",
    siteName: "NoteHub",
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;
