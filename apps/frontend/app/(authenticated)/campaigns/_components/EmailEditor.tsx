"use client";

import { SubjectLine } from "./SubjectLine";
import { RichTextEditor } from "./RichTextEditor";

export function EmailEditor() {
  return (
    <div className="h-full flex flex-col gap-6 p-8 overflow-y-auto">
      <div className="flex-none">
        <SubjectLine />
      </div>
      <div className="flex-1 min-h-[400px]">
        <RichTextEditor />
      </div>
    </div>
  );
}
