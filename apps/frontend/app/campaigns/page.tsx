"use client";

import { CampaignStepper } from "./_components/CampaignStepper";
import { EmailEditor } from "./_components/EmailEditor";
import { PreviewPanel } from "./_components/PreviewPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function CampaignsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] bg-background overflow-hidden animate-in fade-in duration-500">
      {/* Top Stepper */}
      <div className="flex-none">
        <CampaignStepper />
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Column: Editor */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <EmailEditor />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Column: Preview */}
          <ResizablePanel defaultSize={45} minSize={30} className="bg-muted/10">
            <PreviewPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
