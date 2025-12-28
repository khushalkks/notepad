interface PinnedResponsesProps {
    responses: string[];
    onRemove: (index: number) => void;
  }
  
  export default function PinnedResponses({ responses, onRemove }: PinnedResponsesProps) {
    return (
      <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
        <h2 className="text-xl font-semibold mb-3">📌 Pinned Responses</h2>
  
        {responses.length === 0 ? (
          <p className="text-gray-400">No pinned responses yet.</p>
        ) : (
          <div className="space-y-3">
            {responses.map((res, i) => (
              <div
                key={i}
                className="p-3 bg-white/15 border border-white/25 rounded-xl flex justify-between items-start"
              >
                <p className="text-gray-200">{res}</p>
  
                <button
                  onClick={() => onRemove(i)}
                  className="text-red-400 hover:text-red-300"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  