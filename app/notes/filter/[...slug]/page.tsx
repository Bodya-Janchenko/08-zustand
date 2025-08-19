import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Note } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const formatTag = (tag?: string) => {
  if (!tag || tag.toLowerCase() === "all") return undefined;
  return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = formatTag(slug?.[0]);

  const data = await fetchNotes("", 1, category);

  const firstNote: Note | undefined = data.notes?.[0];

  return {
    title: `Note: ${firstNote.title || "NoteHub"}`,
    description: firstNote.content.slice(0, 30),
    openGraph: {
      title: `Note: ${firstNote.title || "NoteHub"}`,
      description: firstNote.content.slice(0, 30),
      url: `https://notehub.com/notes/filter/${slug?.join("/") || ""}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: firstNote?.title || "NoteHub",
        },
      ],
      type: "article",
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = formatTag(slug?.[0]);

  const initialData = await fetchNotes("", 1, category);
  return <NotesClient initialData={initialData} initialTag={category} />;
};

export default NotesByCategory;
