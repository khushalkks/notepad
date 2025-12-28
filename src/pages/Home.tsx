import { Brain, FileText, Sparkles, Network, Zap, BookOpen } from "lucide-react"

const Home: React.FC = () => {
  const handleGetStarted = () => {
    // Navigate to notebook page
    window.location.href = "/notebook"
  }

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Upload",
      description: "PDF, DOCX, TXT support"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Q&A",
      description: "Ask anything about your docs"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Summaries",
      description: "Instant key insights"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Mind Maps",
      description: "Visual concept mapping"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 mb-8 animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-purple-500/50">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">AI Smart Notebook</h1>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your documents,
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              supercharged by AI
            </span>
          </h2>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Transform your documents into interactive knowledge. Upload, ask questions,
            generate summaries, and visualize concepts with AI-powered insights.
          </p>

          <button
            onClick={handleGetStarted}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 hover:scale-105"
          >
            <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Get Started
            <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white backdrop-blur-lg border border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-200"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-300">
                {feature.icon}
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm">
            Powered by advanced AI • Secure & Private
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}

export default Home