"use client";

import { ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SpamAnalysis() {
  return (
    <div className="border rounded-xl p-4 bg-card shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h3 className="text-sm font-medium">Deliverability Signal</h3>
        </div>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
          High Confidence
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Spam Risk</span>
            <span className="text-emerald-500 font-medium">Low</span>
          </div>
          <Progress
            value={12}
            className="h-1.5 bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Inbox Rate</span>
            <span className="text-blue-500 font-medium">~98%</span>
          </div>
          <Progress
            value={98}
            className="h-1.5 bg-blue-100 dark:bg-blue-950 [&>div]:bg-blue-500"
          />
        </div>
      </div>

      <div className="pt-3 border-t grid grid-cols-3 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-help text-left">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Link count</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>2 links found. Good range (0-3).</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-help text-left">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Spam words</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>No spam trigger words detected.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-help text-left">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Formatting</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Consider reducing bold text usage slightly.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
