"use client";

import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Select List" },
  { id: 2, label: "Write Email" },
  { id: 3, label: "Sequence & Timing" },
  { id: 4, label: "Review & Launch" },
];

export function CampaignStepper() {
  const currentStep = 2;

  return (
    <div className="w-full border-b border-border bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <li key={step.label} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 mx-4" />
                  )}
                  <button
                    disabled={!isCompleted}
                    className={cn(
                      "group flex items-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1",
                      isCompleted
                        ? "text-muted-foreground hover:text-foreground cursor-pointer"
                        : isCurrent
                          ? "text-primary"
                          : "text-muted-foreground/50 cursor-default",
                    )}
                  >
                    <span
                      className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-full text-[10px] mr-2 transition-colors border",
                        isCompleted
                          ? "bg-primary text-primary-foreground border-primary"
                          : isCurrent
                            ? "border-primary text-primary"
                            : "border-muted-foreground/30 text-muted-foreground/50",
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        step.id
                      )}
                    </span>
                    <span className={cn(isCurrent && "font-semibold")}>
                      {step.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
