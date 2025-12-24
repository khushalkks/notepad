const NotesEditor = () => {
  return (
    <textarea
      placeholder="Write or edit AI-generated notes here..."
      className="
        w-full min-h-[180px]
        bg-gray-50 dark:bg-gray-900
        border border-gray-200 dark:border-gray-700
        rounded-lg p-3 text-sm
        focus:outline-none focus:ring-2 focus:ring-purple-500
      "
    />
  );
};

export default NotesEditor;
