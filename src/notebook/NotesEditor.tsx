import { useState } from "react";

interface NotesEditorProps {
  onSave: (note: string) => void;
}

export default function NotesEditor({ onSave }: NotesEditorProps) {
  const [note, setNote] = useState("");

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
      <h2 className="text-xl font-semibold mb-2">Notes Editor 📝</h2>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your thoughts or AI outputs here..."
        className="w-full h-40 p-3 rounded-xl bg-white/15 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        onClick={() => {
          if (note.trim() !== "") {
            onSave(note);
            setNote("");
          }
        }}
        className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition"
      >
        Save Note
      </button>
    </div>
  );
}
