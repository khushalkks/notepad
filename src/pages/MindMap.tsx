import { useState } from "react";

interface NodeType {
  id: number;
  text: string;
}

export default function MindMap() {
  const [nodes, setNodes] = useState<NodeType[]>([
    { id: 1, text: "Main Idea" },
    { id: 2, text: "Topic 1" },
    { id: 3, text: "Topic 2" },
    { id: 4, text: "Topic 3" },
  ]);

  const addNode = () => {
    const newId = nodes.length + 1;
    setNodes([...nodes, { id: newId, text: `New Node ${newId}` }]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#312e81] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-6 tracking-wide">
        AI Mind Map <span className="text-purple-400">🧠</span>
      </h1>

      <p className="text-gray-300 mb-6 text-center max-w-2xl">
        Visualize your ideas, explore relationships, and structure your thoughts
        in an interactive and beautiful mind map.
      </p>

      {/* Action Button */}
      <button
        onClick={addNode}
        className="mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:scale-105 transition"
      >
        ➕ Add Node
      </button>

      {/* Mind Map Board */}
      <div className="relative w-full max-w-5xl h-[550px] bg-white/10 border border-white/20 rounded-3xl backdrop-blur-xl shadow-xl overflow-hidden p-6">

        {/* Center Node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="px-6 py-4 rounded-full bg-purple-600 shadow-xl border border-purple-300">
            Main Idea
          </div>
        </div>

        {/* Child Nodes */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="px-5 py-3 bg-white/10 border border-white/30 rounded-2xl text-center shadow-md hover:bg-white/20 transition"
              >
                {node.text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
