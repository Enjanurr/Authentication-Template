// components/NoteEditor.tsx
"use client";

import { useState } from "react";
import api from "@/utils/axiosInstance";

export default function NoteEditor({ onCreated }: { onCreated: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitNote = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      await api.post("/api/notesRoutes/addNotes", { content });
      setContent("");
      onCreated();
    } catch (err) {
      console.error("Failed to create note", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <textarea
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
       className="w-full resize-none rounded-lg border border-zinc-300 px-4 py-2
text-zinc-900 placeholder-zinc-400
focus:outline-none focus:ring-2 focus:ring-black bg-white"

        
        rows={4}
      />

      <div className="flex justify-end mt-3">
        <button
          onClick={submitNote}
          disabled={loading}
          className="px-4 py-2 rounded-md bg-black text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
