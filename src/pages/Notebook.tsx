import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UploadModal from "./UploadModal";
import NotebookPage from "../notebook/NotebookPage";


type Notebook = {
  id: string;
  title: string;
  updatedAt: string;
};

const mockNotebooks: Notebook[] = [
  { id: "1", title: "Machine Learning Notes", updatedAt: "2 hours ago" },
  { id: "2", title: "DBMS Mid Sem", updatedAt: "Yesterday" },
  { id: "3", title: "AI Research Paper", updatedAt: "3 days ago" },
];

const Notebook = () => {
  const location = useLocation();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedNotebook, setSelectedNotebook] = useState<Notebook | null>(
    mockNotebooks[0]
  );

  useEffect(() => {
    if (location.state?.openUpload) {
      setIsUploadOpen(true);
    }
  }, [location.state]);

  return (
    <>
      {/* ===== NOTEBOOK LAYOUT ===== */}
      <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        {/* ===== SIDEBAR ===== */}
        <aside className="w-72 p-4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              My Notebooks
            </h2>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="text-sm px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              + New
            </button>
          </div>

          <div className="space-y-2">
            {mockNotebooks.map((notebook) => (
              <button
                key={notebook.id}
                onClick={() => setSelectedNotebook(notebook)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  selectedNotebook?.id === notebook.id
                    ? "bg-purple-50 dark:bg-purple-900/40 border-purple-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent"
                }`}
              >
                <p className="font-medium text-gray-800 dark:text-gray-100 truncate">
                  {notebook.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Updated {notebook.updatedAt}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 p-8 overflow-y-auto">
          <NotebookPage />
        </main>

      </div>

      {/* ===== UPLOAD MODAL ===== */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </>
  );
};

export default Notebook;
