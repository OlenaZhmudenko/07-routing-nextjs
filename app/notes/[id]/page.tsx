import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import getQueryClient from '@/app/utils/getQueryClient';
import NotePreviewClient from '../../@modal/(.)[id]/NotePreview.client';

interface ModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalPage({ params }: ModalPageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}