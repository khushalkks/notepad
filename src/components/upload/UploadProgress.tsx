type Props = {
  progress: number;
};

const UploadProgress = ({ progress }: Props) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-purple-600 h-2 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default UploadProgress;
