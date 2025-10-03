'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteDetailsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Note details error:', error);
  }, [error]);

  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}