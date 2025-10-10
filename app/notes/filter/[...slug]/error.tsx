'use client';

interface ErrorProps {
    error: Error;
  }

export default function ErrorNotes({ error }: ErrorProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}