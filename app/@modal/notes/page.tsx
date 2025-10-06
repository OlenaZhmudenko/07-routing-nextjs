import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import getQueryClient from '@/app/utils/getQueryClient';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes({
      page: 1,
      perPage: 12,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}