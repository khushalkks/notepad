interface UploadProgressProps {
  progress: number;
}

export default function UploadProgress({ progress }: UploadProgressProps) {
  return (
    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden border border-white/30">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
