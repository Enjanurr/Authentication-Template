// components/NoteList.tsx
import { Note } from "@/app/notes/page";

export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="text-zinc-500 text-center mt-10">
        No notes yet. Start writing ✍️
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
        >
          <p className="whitespace-pre-wrap text-zinc-800">
            {note.content}
          </p>
          <span className="text-xs text-zinc-400 mt-2 block">
            {new Date(note.createdAt).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
