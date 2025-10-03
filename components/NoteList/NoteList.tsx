import type { Note } from '@/types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

export interface NoteListProps {
    notes: Note[];
    onDeleteNote?: (id: string) => void;
}

function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => { 
        queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
});

    const handleDeleteNote = (id: string) => {
        deleteNoteMutation.mutate(id);
    };

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <div>
                            <Link href={`/notes/${note.id}`} className={css.link}>
                                View details
                            </Link>
                            <button
                                className={css.button}
                                onClick={() => handleDeleteNote(note.id)}
                                disabled={deleteNoteMutation.isPending}>
                                Delete
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default NoteList;