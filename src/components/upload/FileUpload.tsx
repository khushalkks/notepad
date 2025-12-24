type Props = {
  onUpload: (file: File) => void;
};

const FileUpload = ({ onUpload }: Props) => {
  return (
    <div className="border-2 border-dashed rounded-xl p-8 text-center">
      <input
        type="file"
        className="hidden"
        id="file-upload"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            onUpload(e.target.files[0]);
          }
        }}
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer text-purple-600 font-medium"
      >
        Click to upload
      </label>

      <p className="text-sm text-gray-500 mt-2">
        PDF, DOCX, TXT, Images supported
      </p>
    </div>
  );
};

export default FileUpload;
