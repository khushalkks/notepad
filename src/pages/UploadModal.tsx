import { X } from "lucide-react";

type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Add sources
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Upload documents so AI can base its answers on what matters to you.
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed rounded-xl p-10 text-center hover:border-purple-500 transition">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              ⬆️
            </div>
            <p className="font-medium text-gray-700">
              Upload sources
            </p>
            <p className="text-sm text-gray-500">
              Drag & drop or{" "}
              <span className="text-purple-600 font-medium cursor-pointer">
                choose file
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              PDF, DOCX, TXT, Images (OCR supported)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
