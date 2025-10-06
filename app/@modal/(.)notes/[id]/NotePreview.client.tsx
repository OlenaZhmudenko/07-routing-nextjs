'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
        <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}>
          <button className={css.backBtn} onClick={handleClose}>
            ← Back
          </button>
          <div className={css.item}>
            <div className={css.header}>
              <h2>Loading...</h2>
            </div>
            <p className={css.content}>Please wait while we load your note.</p>
          </div>
        </div>
      </Modal>
    );
  }
  
  if (error) {
     return (
      <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}>
          <button className={css.backBtn} onClick={handleClose}>
            ← Back
          </button>
          <div className={css.item}>
            <div className={css.header}>
              <h2>Error</h2>
            </div>
            <p className={css.content}>
              Sorry, we couldn't load the note. Please try again later.
            </p>
          </div>
        </div>
      </Modal>
    );
  } 

  if (!note) {
    return (
      <Modal isOpen={true} onClose={handleClose}>
        <div className={css.container}>
          <button className={css.backBtn} onClick={handleClose}>
            ← Back
          </button>
          <div className={css.item}>
            <div className={css.header}>
              <h2>Note Not Found</h2>
            </div>
            <p className={css.content}>
              The note you're looking for doesn't exist or may have been deleted.
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={handleClose}>
          ← Back
        </button>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            <strong>Created:</strong> {new Date(note.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className={css.date}>
            <strong>Updated:</strong> {new Date(note.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </Modal>
  );
}