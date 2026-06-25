"use client";

import { useEffect, useState } from "react";
import { Plus, Search, X, Pencil, Trash2, Pin, PinOff } from "lucide-react";
import { SignoutAction } from "../actions/auth";

interface Note {
  id: string;
  title: string;
  content: string;
  folder_id: string | null;
  is_pinned: boolean;
  folder?: Folder;
}

interface Folder {
  id: string;
  name: string;
}

export default function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");

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

  // F3TCH FOLDERS DATA
  async function fetchFolders() {
    const res = await fetch("/api/folders");
    const data = await res.json();
    setFolders(data);
  }

  useEffect(() => {
    fetchNotes();
    fetchFolders();
  }, []);

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
            folder_id: folderId || null,
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
            folder_id: folderId || null,
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
    setFolderId(note.folder_id || "");
    setEditingId(note.id);
    setShowForm(true);
  }

  // FOLDERS CREATE
  async function handleCreateFolder() {
    if (!folderName.trim()) return;

    try {
      const res = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: folderName,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create folder");
      }

      const newFolder = await res.json();

      setFolders((prev) => [newFolder, ...prev]);
      setFolderName("");
    } catch (error) {
      console.error(error);
    }
  }

  // HANDLE PIN
  async function handlePin(note: Note) {
    try {
      const res = await fetch(`/api/notes/${note.id}/pin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_pinned: !note.is_pinned,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to pin note");
      }

      await fetchNotes();
    } catch (error) {
      console.error(error);
    }
  }

  // GROUP NOTES
  const pinnedNotes = notes.filter((note) => note.is_pinned);

  const unpinnedNotes = notes.filter((note) => !note.is_pinned);

  const groupedNotes = unpinnedNotes.reduce(
    (acc, note) => {
      const folderName = note.folder?.name || "Uncategorized";

      if (!acc[folderName]) {
        acc[folderName] = [];
      }

      acc[folderName].push(note);

      return acc;
    },
    {} as Record<string, Note[]>,
  );

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

              <select
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border"
              >
                <option value="">Select Folder</option>

                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSubmit}
                className="h-11 px-6 rounded-lg bg-[#D4537E] text-white"
              >
                {editingId ? "Update Note" : "Save Note"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border mb-6">
          <h2 className="font-semibold mb-4">Create Folder</h2>

          <div className="flex gap-3">
            <input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
              className="flex-1 h-12 px-4 border rounded-lg"
            />

            <button
              onClick={handleCreateFolder}
              className="px-5 bg-[#D4537E] text-white rounded-lg"
            >
              Create
            </button>
          </div>
        </div>

        {pinnedNotes.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">📌 Pinned Notes</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pinnedNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white rounded-2xl border border-yellow-400 p-5 h-64 shadow-sm flex flex-col"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold line-clamp-1">{note.title}</h3>

                    <div className="flex gap-2">
                      <button onClick={() => handlePin(note)}>
                        <Pin className="size-4 fill-yellow-500 text-yellow-500" />
                      </button>

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

                  {/* category badge */}
                  <span className="mt-auto text-xs text-gray-400">
                    {note.folder?.name || "Uncategorized"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">Loading notes...</div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedNotes).map(([folderName, folderNotes]) => (
              <div key={folderName}>
                <h2 className="text-xl font-bold mb-4">📁 {folderName}</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {folderNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white rounded-2xl border border-[#D4537E] p-5 h-64 shadow-sm flex flex-col"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-semibold line-clamp-1">
                          {note.title}
                        </h3>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePin(note)}
                            className="hover:scale-110 transition-transform"
                          >
                            {note.is_pinned ? (
                              <Pin className="size-4 fill-yellow-500 text-yellow-500" />
                            ) : (
                              <PinOff className="size-4 text-gray-400" />
                            )}
                          </button>
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
                </div>
              </div>
            ))}

            {/* Add Note Card */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>
        )}
      </main>
    </div>
  );
}
