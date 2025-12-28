import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotesEditor from "./NotesEditor";
import PinnedResponses from "./PinnedResponses";
import HighlightedText from "./HighlightedText";
import FileUpload from "../components/upload/FileUpload";
import AIChat from "../components/chat/AiChat";

export default function NotebookLayout() {
  const [pinnedNotes, setPinnedNotes] = useState<string[]>([]);
  const [highlightText, setHighlightText] = useState(
    "Upload a file to generate AI summary ✨"
  );

  const [summaryText, setSummaryText] = useState("");
  const navigate = useNavigate();

  const handleSaveNote = (note: string) => {
    setPinnedNotes(prev => [...prev, note]);
  };

  const handleRemoveNote = (index: number) => {
    setPinnedNotes(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen px-8 py-10 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#312e81] text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-wide">
          AI Smart Notebook <span className="text-purple-400">📒</span>
        </h1>

        <button className="px-5 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition shadow-lg">
          Settings ⚙️
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

        {/* LEFT PANEL */}
        <div className="flex flex-col gap-6">

          {/* Notes */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">📝 Notes Section</h2>
            <p className="text-gray-300 text-sm mb-3">
              Write, store and save your important thoughts here.
            </p>

            <NotesEditor onSave={handleSaveNote} />
          </div>

          {/* Saved Notes */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-3">📌 Saved Notes</h2>

            <PinnedResponses
              responses={pinnedNotes}
              onRemove={handleRemoveNote}
            />
          </div>
        </div>

        {/* CENTER PANEL */}
        <div className="flex flex-col gap-6">

          {/* Upload */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">📤 Upload Files</h2>
            <p className="text-gray-300 text-sm mb-3">
              Upload PDFs, Images or Documents for AI analysis.
            </p>

            <FileUpload
              onSummaryGenerated={(text: string) => {
                setSummaryText(text);
                setHighlightText(text);
              }}
            />
          </div>

          {/* Summary */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">✨ Highlighted Insight</h2>
            <p className="text-gray-300 text-sm mb-3">
              AI Generated Summary / Key Insight
            </p>

            <HighlightedText text={highlightText} />
          </div>
        </div>

        {/* RIGHT PANEL — AI CHAT + ACTIONS */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xl shadow-xl sticky top-5 h-[85vh] flex flex-col">

 

  {/* Chat Proper Working */}
  <div className="flex-1 overflow-y-auto mb-4">
    <AIChat />
  </div>

  {/* Actions */}
  <h2 className="text-xl font-semibold mb-2">
    ⚙️ AI Actions
  </h2>

  <p className="text-gray-300 text-sm mb-3">
    Use AI features on your uploaded content.
  </p>

  <div className="flex flex-col gap-3">

      {/* Mindmap */}
  <button
    onClick={() => {
      if (!summaryText)
        return alert("Please upload file first (summary required)");
      navigate("/mindmap", { state: { text: summaryText } });
    }}
    className="w-full px-6 py-3 rounded-xl 
               bg-gradient-to-r from-blue-200 to-purple-200
               text-black font-semibold
               hover:scale-[1.02] hover:shadow-lg 
               transition-all duration-300"
  >
    Generate Mindmap
  </button>

  {/* Quiz */}
  <button
    onClick={() => {
      if (!summaryText)
        return alert("Please upload file first (summary required)");
      navigate("/quiz", { state: { text: summaryText } });
    }}
    className="w-full px-6 py-3 rounded-xl 
               bg-gradient-to-r from-pink-200 to-red-200
               text-black font-semibold
               hover:scale-[1.02] hover:shadow-lg
               transition-all duration-300"
  >
    Generate Quiz
  </button>


  </div>
</div>

      </div>
    </div>
  );
}
