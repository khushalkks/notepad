interface HighlightedTextProps {
    text: string;
  }
  
  export default function HighlightedText({ text }: HighlightedTextProps) {
    return (
      <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-gray-200">
        {text}
      </div>
    );
  }
  