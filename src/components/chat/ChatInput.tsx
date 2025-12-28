import { useState } from "react";

interface ChatInputProps {
  onSend: (msg: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex gap-3 mt-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
        className="flex-1 p-3 rounded-xl bg-white/15 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        onClick={handleSend}
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition"
      >
        Send
      </button>
    </div>
  );
}
