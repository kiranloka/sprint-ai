"use client";

import { LivePreview } from "./LivePreview";
import { SpamAnalysis } from "./SpamAnalysis";

export function PreviewPanel() {
  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 min-h-0">
        <LivePreview />
      </div>

      <div className="flex-none p-6 border-t bg-background z-20">
        <SpamAnalysis />
      </div>
    </div>
  );
}
