import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const NotesEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Write or edit AI-generated notes here…</p>",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
      <EditorContent editor={editor} />
    </div>
  );
};

export default NotesEditor;
