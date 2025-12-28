import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const location = useLocation();
  const uploadedText: string =
    location.state?.text || "No text provided, upload content first.";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    generateQuiz(uploadedText);
  }, []);

  const generateQuiz = (text: string) => {
    if (!text || text === "No text provided, upload content first.") return;

    const sampleQuestions: Question[] = [
      {
        question: "What is the main topic of the uploaded content?",
        options: ["Technology", "Education", "Health", "Not Clear"],
        answer: "Not Clear",
      },
      {
        question: "Is the uploaded content informative?",
        options: ["Yes", "No", "Maybe", "Not Sure"],
        answer: "Yes",
      },
      {
        question: "Does the content contain useful insights?",
        options: ["Yes", "No", "A little", "Not Mentioned"],
        answer: "Yes",
      },
    ];

    setQuestions(sampleQuestions);
  };

  const handleSubmit = () => {
    const radioButtons = document.querySelectorAll(
      "input[type='radio']:checked"
    ) as NodeListOf<HTMLInputElement>;

    let sc = 0;
    radioButtons.forEach((radio, index) => {
      if (radio.value === questions[index].answer) sc++;
    });

    setScore(sc);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#312e81] text-white p-10">

      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">
        AI Generated Quiz 🎯
      </h1>

      <p className="text-gray-300 max-w-2xl text-center mb-6">
        Quiz automatically generated from uploaded / summarized text.
      </p>

      {/* Quiz Container */}
      <div className="w-full max-w-4xl bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-xl shadow-xl">

        {questions.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">
            ⚠️ No text found. Upload file or text first.
          </p>
        ) : (
          <>
            {questions.map((q, i) => (
              <div key={i} className="mb-6">
                <p className="text-xl font-semibold mb-3">
                  {i + 1}. {q.question}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, j) => (
                    <label
                      key={j}
                      className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl p-3 cursor-pointer hover:bg-white/20 transition"
                    >
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={opt}
                        disabled={submitted}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition shadow-lg"
              >
                Submit Quiz 🚀
              </button>
            ) : (
              <div className="text-center mt-4 text-2xl font-bold text-green-400">
                🎉 Your Score: {score} / {questions.length}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
