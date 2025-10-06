'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, deleteNote, FetchNotesParams } from '@/lib/api';
import { CreateNoteRequest, NoteTag } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebounce } from '@/app/hooks/useDebounce';
import css from './NotesPage.module.css';
import type { FetchNotesResponse } from '@/lib/api';

const NOTES_PER_PAGE = 12;

interface NotesClientProps {
  initialTag?: NoteTag;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const queryClient = useQueryClient();

  const fetchParams: FetchNotesParams = {
    page: currentPage,
    perPage: NOTES_PER_PAGE,
    search: debouncedSearchTerm || undefined,
    tag: initialTag,
  };

  const {
    data: notesData,
    isLoading,
    error,
    isFetching,
  } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentPage, debouncedSearchTerm, initialTag],
    queryFn: () => fetchNotes(fetchParams),
    placeholderData: (previousData) => previousData,
  });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setIsModalOpen(false);
      setCurrentPage(1);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const handleCreateNote = (values: CreateNoteRequest) => {
    createNoteMutation.mutate(values);
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(id);
    }
  };

  const hasNotes = notesData && notesData.notes && notesData.notes.length > 0;
  const totalPages = notesData?.totalPages || 0;
  const currentTag = initialTag || 'All';

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>   
      </header>

      {(isLoading || isFetching) && <div>Loading...</div>}
      {error && <div>Error loading notes</div>}

      {hasNotes && notesData && (
        <NoteList
          notes={notesData.notes}
          onDeleteNote={handleDeleteNote}
        />
      )}

      {!isLoading && !hasNotes && !error && (
        <div>No notes found</div>
      )}
      
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={handleCreateNote}
            onCancel={() => setIsModalOpen(false)}
            isSubmitting={createNoteMutation.isPending}
          />   
        </Modal> 
      )}
    </div>
  );
}