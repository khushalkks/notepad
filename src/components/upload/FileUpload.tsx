import { useState } from "react";
import UploadProgress from "./UploadProgress";

export default function FileUpload() {
  const [fileName, setFileName] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (file: File) => {
    setFileName(file.name);
    setIsUploading(true);
    setProgress(0);

    // Fake upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
      <h2 className="text-xl font-semibold mb-2">📤 Upload File</h2>

      <div className="flex flex-col gap-3">
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          className="w-full text-sm text-gray-300"
        />

        {fileName && (
          <p className="text-gray-300">
            Uploading: <span className="text-purple-300">{fileName}</span>
          </p>
        )}

        {isUploading && <UploadProgress progress={progress} />}

        {!isUploading && progress === 100 && (
          <p className="text-green-400 mt-2">Upload Completed ✅</p>
        )}
      </div>
    </div>
  );
}
