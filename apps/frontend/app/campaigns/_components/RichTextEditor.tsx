"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Smile,
} from "lucide-react";
import { AiControls } from "./AiControls";

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Hi {first_name}...",
      }),
    ],
    content:
      "<p>Hi {first_name},</p><p>I noticed that {company} is scaling efficiently...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background shadow-sm group focus-within:ring-1 focus-within:ring-primary/30 transition-shadow">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/20">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold")
                ? "bg-secondary text-secondary-foreground"
                : "h-8 w-8"
            }
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
                ? "bg-secondary text-secondary-foreground"
                : "h-8 w-8"
            }
          >
            <Italic className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList")
                ? "bg-secondary text-secondary-foreground"
                : "h-8 w-8"
            }
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList")
                ? "bg-secondary text-secondary-foreground"
                : "h-8 w-8"
            }
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        <AiControls />
      </div>

      {/* Editor Content */}
      <div
        className="flex-1 overflow-y-auto bg-background cursor-text"
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </div>

      {/* Bottom Actions / Variables */}
      <div className="flex items-center gap-2 px-3 py-2 border-t bg-muted/10 text-xs">
        <span className="text-muted-foreground font-medium">
          Insert variable:
        </span>
        <button className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 transition-colors">
          {"{first_name}"}
        </button>
        <button className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 transition-colors">
          {"{company}"}
        </button>
        <button className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300 transition-colors">
          {"{role}"}
        </button>
      </div>
    </div>
  );
}
