import { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 Page not found | NoteHub",
  description:
    "Sorry, the page you are looking for does not exist. Please return to the NoteHub homepage.",
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
        alt: "404 Page not found | NoteHub",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `404 Page not found | NoteHub`,
    description:
      "Sorry, the page you are looking for does not exist. Please return to the NoteHub homepage.",
    images: ["https://notehub.com/error-404.jpg"],
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
