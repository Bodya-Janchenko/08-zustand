import { fetchNotes } from "@/lib/api";
import { NoteTag } from "@/types/note";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

type Category = NoteTag | "All";

interface NotesByCategoryProps {
  params: { slug: Category[] };
}

const formatTag = (category?: Category): NoteTag | undefined => {
  if (!category || category.toLowerCase() === "all") return undefined;
  return (category.charAt(0).toUpperCase() +
    category.slice(1).toLowerCase()) as NoteTag;
};

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const { slug } = await params;
  const category = formatTag(slug?.[0]);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
