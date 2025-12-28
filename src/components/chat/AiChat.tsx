import { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function AIChat() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);

  const handleSend = async (msg: string) => {
    setMessages(prev => [...prev, { text: msg, isUser: true }]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: "🤖 AI: " + msg, isUser: false }
      ]);
    }, 600);
  };

  return (
    <div className="
      bg-[#0b0f1e]/90 
      border border-white/20 
      rounded-2xl 
      p-5 
      text-white 
      flex flex-col 
      h-[500px] 
      backdrop-blur-xl 
      shadow-2xl 
      shadow-purple-900/40
      hover:shadow-purple-700/60
      transition
    ">

      <h2 className="text-xl font-bold mb-3 tracking-wide">
        💬 AI Chat
      </h2>

      {/* Chat Box */}
      <div className="
        flex-1 
        overflow-y-auto 
        space-y-3 
        pr-2 
        rounded-xl
        bg-white/5 
        border border-white/10 
        p-3
        scrollbar-thin 
        scrollbar-thumb-purple-600 
        scrollbar-track-transparent
      ">
        {messages.map((m, i) => (
          <ChatMessage key={i} text={m.text} isUser={m.isUser} />
        ))}
      </div>

      {/* Input */}
      <div className="mt-3">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
