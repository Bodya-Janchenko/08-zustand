"use client";

import css from "./Notes.module.css";

import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import type { FetchNotesResponse } from "@/lib/api";

import toast, { Toaster } from "react-hot-toast";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClient {
  category?: NoteTag | undefined;
}

const NotesClient = ({ category }: NotesClient) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debounceSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isError, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", debounceSearchQuery, currentPage, category],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage, category),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(`Oops, something went wrong while get the note.`);
      console.log(`Something went wrong while get the note: ${error}`);
    }
  }, [isError, error]);

  const notes = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={css.app}>
        <Toaster position="top-right" reverseOrder={false} />
        <header className={css.toolbar}>
          <SearchBox setSearchQuery={setSearchQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        <NoteList notes={notes} />
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default NotesClient;
