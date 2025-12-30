// app/notes/page.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import NoteEditor from "@/components/noteEditor";
import NoteList from "@/components/noteList";
import publicApi from "@/utils/publicApi";
import { useRouter } from "next/navigation"
export interface Note {
  _id: string;
  content: string;
  createdAt: string;
}

async function fetchPost(): Promise<Note[]> {
  const response = await api.get("/api/notesRoutes/getNotes");
  return response.data;
}

  const handleLogout = async () => {
    const router = useRouter();
    try {
      await publicApi.post("/api/auth/logout");
      localStorage.removeItem("accessToken");
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_HOST);
      const res = await api.get("/api/notesRoutes/getNotes");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">My Notes</h1>

        <NoteEditor onCreated={fetchNotes} />

        {loading ? (
          <p className="text-zinc-500 mt-6">Loading notes...</p>
        ) : (
          <NoteList notes={notes} />
        )}
      </div>
    </main>
  );
}
