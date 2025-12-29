import { useState } from "react"

interface Node {
  id: number
  text: string
}

export default function MindMap() {
  const [centerText, setCenterText] = useState("Main Topic")
  const [nodes, setNodes] = useState<Node[]>([])
  const [input, setInput] = useState("")

  const addNode = () => {
    if (!input.trim()) return
    setNodes([...nodes, { id: Date.now(), text: input }])
    setInput("")
  }

  const deleteNode = (id: number) => {
    setNodes(nodes.filter((n) => n.id !== id))
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Mind Map</h2>

      {/* Controls */}
      <div className="mb-6 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add sub-topic"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={addNode}
          className="bg-black text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Mind Map Area */}
      <div className="relative bg-white border rounded p-10 min-h-[300px]">

        {/* Center Node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">
          {centerText}
        </div>

        {/* Child Nodes */}
        <div className="flex flex-wrap gap-6 justify-center mt-32">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="relative bg-gray-100 px-4 py-2 rounded shadow"
            >
              {node.text}

              <button
                onClick={() => deleteNode(node.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white
                           text-xs w-5 h-5 rounded-full"
              >
                ×
              </button>
            </div>
          ))}

          {nodes.length === 0 && (
            <p className="text-gray-500">
              No sub-topics yet. Add one above.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
