import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-4">
        AI-Powered Smart Notebook
      </h1>

      <p className="text-lg mb-6 text-center max-w-xl">
        Upload PDFs, images or notes and interact with them using AI.
        Summaries, Q&A, mind-maps — all in one place.
      </p>

      <button
        onClick={() => navigate("/notebook")}
        className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
      >
        Open Notebook
      </button>
    </div>
  )
}
