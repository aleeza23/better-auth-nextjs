"use client";

import { useEffect, useState } from "react";
import { Plus, Search, X, Pencil, Trash2 } from "lucide-react";
import { SignoutAction } from "./actions/auth";

interface Note {
  id: string;
  title: string;
  content: string;
  created_at?: string;
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const res = await fetch("/api/notes");
      console.log(res, "resss");

      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!title.trim()) return;

    try {
      if (editingId) {
        const res = await fetch(`/api/notes/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update note");
        }
      } else {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to create note");
        }
      }

      await fetchNotes();

      setTitle("");
      setContent("");
      setEditingId(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(note: Note) {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#D4537E]">My Notes</h1>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

              <input
                placeholder="Search notes..."
                className="w-72 pl-10 pr-4 h-10 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none"
              />
            </div>

            <div className="size-10 rounded-full bg-[#D4537E] text-white flex items-center justify-center">
              A
            </div>

            <form action={SignoutAction}>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#D4537E] text-white rounded-md hover:bg-black/80 text-sm cursor-pointer"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div
          className={`overflow-hidden transition-all duration-500 ${
            showForm ? "max-h-[700px] opacity-100 mb-8" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl border p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Note" : "Create Note"}
              </h2>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setTitle("");
                  setContent("");
                }}
              >
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="w-full h-12 px-4 rounded-lg border"
              />

              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note..."
                className="w-full p-4 rounded-lg border resize-none"
              />

              <button
                onClick={handleSubmit}
                className="h-11 px-6 rounded-lg bg-[#D4537E] text-white"
              >
                {editingId ? "Update Note" : "Save Note"}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading notes...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-[#D4537E] p-5 h-64 shadow-sm flex flex-col"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold line-clamp-1">{note.title}</h3>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(note)}>
                      <Pencil className="size-4 text-gray-500" />
                    </button>

                    <button onClick={() => handleDelete(note.id)}>
                      <Trash2 className="size-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-6">
                  {note.content}
                </p>
              </div>
            ))}

            <button
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setContent("");
                setShowForm(true);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="h-64 rounded-2xl border-2 border-dashed border-[#D4537E]/30 bg-white flex flex-col items-center justify-center hover:bg-[#D4537E]/5"
            >
              <div className="size-14 rounded-full bg-[#D4537E]/10 flex items-center justify-center">
                <Plus className="size-7 text-[#D4537E]" />
              </div>

              <span className="mt-4 font-medium">Add Note</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
