"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SubjectLine() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium text-foreground">
          Subject Line
        </Label>
        <Badge
          variant="secondary"
          className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100"
        >
          A/B Enabled
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="relative group">
          <span className="absolute left-3 top-2.5 text-xs font-medium text-muted-foreground w-6">
            A
          </span>
          <Input
            placeholder="Quick question about {company}..."
            className="pl-8 h-10 border-input/60 focus-visible:border-primary/50 transition-colors"
          />
        </div>

        <div className="relative group">
          <span className="absolute left-3 top-2.5 text-xs font-medium text-muted-foreground w-6">
            B
          </span>
          <Input
            placeholder="Alternative subject line..."
            className="pl-8 h-10 border-input/60 focus-visible:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Info className="w-3.5 h-3.5" />
        <span>We’ll automatically test and optimize after 100 sends</span>
      </div>
    </div>
  );
}
