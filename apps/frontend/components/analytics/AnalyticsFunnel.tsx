"use client";

import React from "react";
import { InfoIcon, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FunnelStage {
  label: string;
  count: number;
  percentage: string;
  description: string;
  advice: string;
  color: string;
}

interface AnalyticsFunnelProps {
  stages: FunnelStage[];
}

export function AnalyticsFunnel({ stages }: AnalyticsFunnelProps) {
  return (
    <Card className="border-none shadow-sm bg-background">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.label}>
              <div className="flex-1 w-full relative group">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-col p-4 rounded-xl bg-background hover:bg-secondary/50 transition-colors cursor-help border border-transparent hover:border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-muted-background uppercase tracking-wider text-[10px]">
                            {stage.label}
                          </span>
                          <InfoIcon className="h-3 w-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold tracking-tight">
                            {stage.count.toLocaleString()}
                          </span>
                          {index > 0 && (
                            <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                              {stage.percentage}
                            </span>
                          )}
                        </div>
                        <div className="h-1.5 w-full mt-3 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: "100%",
                              backgroundColor: stage.color,
                            }}
                          />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="font-semibold mb-1">
                        {stage.label} Metrics
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {stage.description}
                      </p>
                      <div className="bg-primary/10 text-primary text-xs p-2 rounded-md">
                        <strong>Tip:</strong> {stage.advice}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {index < stages.length - 1 && (
                <div className="hidden md:flex text-muted-foreground/30">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
