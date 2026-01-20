"use client";

import * as React from "react";
import {
  MoreHorizontal,
  ArrowUpDown,
  Play,
  Pause,
  Copy,
  Eye,
  CheckCircle2,
  PauseCircle,
  Radio,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type CampaignStatus = "running" | "paused" | "completed";

export interface Campaign {
  id: string;
  name: string;
  leadList: string;
  openRate: number;
  replyRate: number;
  meetingsBooked: number;
  status: CampaignStatus;
}

interface CampaignPerformanceTableProps {
  campaigns: Campaign[];
  onView?: (campaign: Campaign) => void;
  onDuplicate?: (campaign: Campaign) => void;
  onToggleStatus?: (campaign: Campaign) => void;
  maxHeight?: string; // e.g. "420px"
}

type SortKey = "name" | "openRate" | "replyRate" | "meetingsBooked" | "status";
type SortDir = "asc" | "desc";

function clampPercent(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function statusBadge(status: CampaignStatus) {
  switch (status) {
    case "running":
      return {
        icon: Radio,
        className:
          "border border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      };
    case "paused":
      return {
        icon: PauseCircle,
        className:
          "border border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
      };
    case "completed":
      return {
        icon: CheckCircle2,
        className:
          "border border-slate-500/25 bg-slate-500/10 text-slate-700 dark:text-slate-300",
      };
  }
}

export function CampaignPerformanceTable({
  campaigns,
  onView,
  onDuplicate,
  onToggleStatus,
  maxHeight = "520px",
}: CampaignPerformanceTableProps) {
  const [sort, setSort] = React.useState<{ key: SortKey; dir: SortDir }>({
    key: "openRate",
    dir: "desc",
  });

  const sorted = React.useMemo(() => {
    const copy = [...campaigns];
    const { key, dir } = sort;

    const factor = dir === "asc" ? 1 : -1;
    copy.sort((a, b) => {
      const av = a[key] as any;
      const bv = b[key] as any;

      // string sort
      if (typeof av === "string" && typeof bv === "string") {
        return av.localeCompare(bv) * factor;
      }
      // number sort
      return (Number(av) - Number(bv)) * factor;
    });
    return copy;
  }, [campaigns, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "desc" };
      return { key, dir: prev.dir === "desc" ? "asc" : "desc" };
    });
  }

  const SortButton = ({
    label,
    sortKey,
    align = "left",
  }: {
    label: string;
    sortKey: SortKey;
    align?: "left" | "right";
  }) => (
    <Button
      type="button"
      variant="ghost"
      onClick={() => toggleSort(sortKey)}
      className={cn(
        "h-8 px-2 -mx-2 font-semibold text-foreground/90 hover:bg-accent/40",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        align === "right" && "ml-auto",
      )}
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
    </Button>
  );

  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
      {/* Scroll container enables sticky header if needed */}
      <div className="overflow-auto rounded-xl" style={{ maxHeight }}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-secondary/80 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[320px]">
                <SortButton label="Campaign" sortKey="name" />
              </TableHead>

              <TableHead className="min-w-[220px]">Lead list</TableHead>

              <TableHead className="w-[140px]">
                <SortButton label="Open rate" sortKey="openRate" />
              </TableHead>

              <TableHead className="w-[140px]">
                <SortButton label="Reply rate" sortKey="replyRate" />
              </TableHead>

              <TableHead className="w-[120px]">
                <SortButton label="Meetings" sortKey="meetingsBooked" />
              </TableHead>

              <TableHead className="w-[140px]">
                <SortButton label="Status" sortKey="status" />
              </TableHead>

              <TableHead className="w-[72px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {sorted.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No campaigns found.
                </TableCell>
              </TableRow>
            ) : (
              sorted.map((campaign, idx) => {
                const open = clampPercent(campaign.openRate);
                const reply = clampPercent(campaign.replyRate);
                const meta = statusBadge(campaign.status);
                const Icon = meta.icon;

                return (
                  <TableRow
                    key={campaign.id}
                    className={cn(
                      "transition-colors",
                      "hover:bg-accent/35",
                      idx % 2 === 0 ? "bg-transparent" : "bg-accent/15",
                    )}
                  >
                    <TableCell className="font-semibold text-foreground">
                      <div className="flex flex-col">
                        <span className="leading-5">{campaign.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ID: {campaign.id}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {campaign.leadList}
                    </TableCell>

                    <TableCell className="tabular-nums">
                      <div className="flex items-center gap-2">
                        <span className="w-12">{open}%</span>
                        <div className="h-2 w-full max-w-[120px] rounded-full bg-muted/60">
                          <div
                            className="h-2 rounded-full bg-primary/80"
                            style={{ width: `${open}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="tabular-nums">
                      <div className="flex items-center gap-2">
                        <span className="w-12">{reply}%</span>
                        <div className="h-2 w-full max-w-[120px] rounded-full bg-muted/60">
                          <div
                            className="h-2 rounded-full bg-primary/80"
                            style={{ width: `${reply}%` }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="tabular-nums font-medium">
                      {campaign.meetingsBooked}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "gap-1.5 rounded-full px-2.5 py-1 font-normal capitalize",
                          meta.className,
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {campaign.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "h-8 w-8 p-0",
                              "text-muted-foreground hover:text-foreground hover:bg-accent/40",
                              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                            )}
                          >
                            <span className="sr-only">Open actions</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>

                          <DropdownMenuItem onSelect={() => onView?.(campaign)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onSelect={() => onDuplicate?.(campaign)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {campaign.status === "running" ? (
                            <DropdownMenuItem
                              className="text-amber-700 dark:text-amber-300"
                              onSelect={() => onToggleStatus?.(campaign)}
                            >
                              <Pause className="mr-2 h-4 w-4" />
                              Pause
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-emerald-700 dark:text-emerald-300"
                              onSelect={() => onToggleStatus?.(campaign)}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              Resume
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
