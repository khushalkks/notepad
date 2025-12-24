import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const useAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    // Fake AI response (replace with LLM)
    await new Promise((r) => setTimeout(r, 800));

    setMessages((m) => [
      ...m,
      { role: "assistant", content: "AI response will appear here." },
    ]);

    setLoading(false);
  };

  return { messages, sendMessage, loading };
};
