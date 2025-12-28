interface ChatMessageProps {
  text: string;
  isUser?: boolean;
}

export default function ChatMessage({ text, isUser = false }: ChatMessageProps) {
  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-xl border 
        ${
          isUser
            ? "bg-indigo-500 border-indigo-400 text-white"
            : "bg-white/10 border-white/20 text-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
