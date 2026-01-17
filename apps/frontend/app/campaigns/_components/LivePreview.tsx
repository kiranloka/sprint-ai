"use client";

import { useState } from "react";
import { Monitor, Smartphone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function LivePreview() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="flex flex-col h-full bg-muted/30 border-l">
      {/* Function Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 px-3 text-xs",
              device === "desktop" && "bg-background shadow-sm text-foreground",
            )}
            onClick={() => setDevice("desktop")}
          >
            <Monitor className="w-3.5 h-3.5 mr-1.5" />
            Desktop
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 px-3 text-xs",
              device === "mobile" && "bg-background shadow-sm text-foreground",
            )}
            onClick={() => setDevice("mobile")}
          >
            <Smartphone className="w-3.5 h-3.5 mr-1.5" />
            Mobile
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden lg:inline-block">
            Preview as:
          </span>
          <Select defaultValue="john">
            <SelectTrigger className="h-8 w-[180px] text-xs bg-background">
              <SelectValue placeholder="Select lead" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John (Stripe, Growth)</SelectItem>
              <SelectItem value="sarah">Sarah (Vercel, Founder)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center">
        <div
          className={cn(
            "bg-white text-slate-900 shadow-sm transition-all duration-300 ease-in-out border border-slate-200 overflow-hidden flex flex-col items-center",
            device === "mobile"
              ? "w-[375px] rounded-[30px] min-h-[600px] border-4 border-slate-800"
              : "w-full max-w-2xl rounded-lg min-h-[500px]",
          )}
        >
          {/* Mock Gmail Header (only for desktop to look realistic, or simple header for mobile) */}
          <div className="w-full border-b border-slate-100 p-4 bg-slate-50/50">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                <AvatarFallback className="bg-blue-600 text-white font-medium">
                  YO
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900">
                    You
                  </span>
                  <span className="text-xs text-slate-500">
                    &lt;alex@sprint.ai&gt;
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">to me, John</div>
              </div>
              <div className="text-xs text-slate-400">
                10:42 AM (0 minutes ago)
              </div>
            </div>
            <div className="mt-3 text-lg font-medium text-slate-900 leading-tight">
              Quick question about Stripe...
            </div>
          </div>

          {/* Email Body */}
          <div className="w-full p-6 text-[15px] leading-relaxed text-slate-700 font-sans">
            <p className="mb-4">Hi John,</p>
            <p className="mb-4">
              I noticed that{" "}
              <span className="bg-blue-50 text-blue-700 font-medium px-1 rounded">
                Stripe
              </span>{" "}
              is scaling efficiently, but I was wondering how you're handling
              the increasing volume of outbound data?
            </p>
            <p className="mb-4">
              We help revenue teams automate this process. Would be open to a
              5-min chat next Tuesday?
            </p>
            <p className="mb-6">
              Best,
              <br />
              Alex
            </p>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded text-xs text-slate-500">
              <p>
                Sent via Sprint AI •{" "}
                <a href="#" className="underline decoration-slate-300">
                  Unsubscribe
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
