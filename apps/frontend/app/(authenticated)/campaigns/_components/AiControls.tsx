"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Wand2, Scissors, WholeWord } from "lucide-react";

export function AiControls() {
  return (
    <div className="flex items-center gap-2 py-2 overflow-x-auto no-scrollbar">
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-1.5 text-xs font-medium border-dashed border-primary/30 text-primary hover:bg-primary/5"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Rewrite
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <Scissors className="w-3.5 h-3.5" />
        Shorten
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <WholeWord className="w-3.5 h-3.5" />
        Fix Spelling
      </Button>

      <div className="h-4 w-px bg-border mx-1" />

      <Select defaultValue="direct">
        <SelectTrigger className="h-8 w-[130px] text-xs border-0 bg-secondary/50 hover:bg-secondary/80 focus:ring-0">
          <SelectValue placeholder="Select tone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="direct">Direct</SelectItem>
          <SelectItem value="casual">Casual</SelectItem>
          <SelectItem value="founder">Founder-style</SelectItem>
          <SelectItem value="friendly">Friendly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
