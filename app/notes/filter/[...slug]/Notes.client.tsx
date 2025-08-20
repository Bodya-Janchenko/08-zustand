"use client";

import css from "./Notes.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

import Link from "next/link";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Toaster } from "react-hot-toast";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [debounceSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debounceSearchQuery, currentPage, tag],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create Note +
        </Link>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes: {(error as Error).message}</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
      {notes.length === 0 && !isLoading && !isError && <p>No notes found.</p>}
    </div>
  );
}
