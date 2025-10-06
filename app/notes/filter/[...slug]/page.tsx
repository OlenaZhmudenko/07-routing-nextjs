import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import getQueryClient from '@/app/utils/getQueryClient';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const tagParam = slug?.[0];
  const tag: NoteTag | undefined = tagParam === 'All' 
    ? undefined 
    : (tagParam as NoteTag);
  
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { page: 1, perPage: 12, tag }],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}