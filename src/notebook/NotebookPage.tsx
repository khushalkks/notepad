import ChatWindow from "../components/chat/ChatWindow";
import NotesEditor from "./NotesEditor";
import { useNavigate } from "react-router-dom";


const NotebookPage = () => {
const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT: Summary + Notes */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* AI SUMMARY */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-purple-600 mb-2">
            📌 AI Summary
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            LLM-generated summary of uploaded documents will appear here.
          </p>
        </div>

        {/* NOTES */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">
            📝 Notes
          </h2>
          <NotesEditor />
        </div>

      </div>

      {/* RIGHT: Chat + Actions */}
      <div className="space-y-6">

        {/* AI CHAT */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm h-[420px] flex flex-col">
          <h2 className="text-lg font-semibold mb-3  text-purple-600 ">
            🤖 Ask AI
          </h2>
          <ChatWindow notebookId="notebook-1" />
        </div>

        {/* ACTION BUTTONS */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">
            Tools
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <button 
            onClick={() => navigate("/mindmap")}
            className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700">
              🧩 Mind Map
            </button>
            <button 
            onClick={() => navigate("/quiz")}
            className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700">
              📝 Quiz
            </button>
            <button className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700">
              📊 Flashcards
            </button>
            <button className="p-3 rounded-lg border hover:bg-purple-50 dark:hover:bg-gray-700">
              📚 Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotebookPage;
