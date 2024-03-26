"use client";
import NotePreview from "../../../../../components/notes/note-preview";

export default function NotePreviews({
  notes,
  refetch,
}: {
  notes: any;
  refetch: () => void;
}) {
  if (!Array.isArray(notes)) {
    return null;
  }

  return notes.map((note, index) => (
    <NotePreview
      key={index}
      id={note.id}
      title={note.title}
      content={note.content_raw.trim()}
      createdAt={new Date(note.created_at)}
      refetch={refetch}
    />
  ));
}
