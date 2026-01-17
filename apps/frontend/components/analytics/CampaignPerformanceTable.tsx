"use client";

import * as React from "react";
import {
  MoreHorizontal,
  ArrowUpDown,
  Play,
  Pause,
  Copy,
  Eye,
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
}

export function CampaignPerformanceTable({
  campaigns,
}: CampaignPerformanceTableProps) {
  return (
    <div className="rounded-md border border-border shadow-sm bg-card/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Campaign Name</TableHead>
            <TableHead>Lead List</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 hover:bg-transparent font-semibold"
              >
                Open Rate
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                className="p-0 hover:bg-transparent font-semibold"
              >
                Reply Rate
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Meetings</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow
              key={campaign.id}
              className="group hover:bg-accent/30 transition-colors"
            >
              <TableCell className="font-semibold text-foreground">
                {campaign.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {campaign.leadList}
              </TableCell>
              <TableCell>{campaign.openRate}%</TableCell>
              <TableCell>{campaign.replyRate}%</TableCell>
              <TableCell>
                <div className="font-medium">{campaign.meetingsBooked}</div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(
                    "capitalize font-normal",
                    campaign.status === "running" &&
                      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25",
                    campaign.status === "paused" &&
                      "bg-amber-500/15 text-amber-700 dark:text-amber-400 hover:bg-amber-500/25",
                    campaign.status === "completed" &&
                      "bg-slate-500/15 text-slate-700 dark:text-slate-400 hover:bg-slate-500/25",
                  )}
                >
                  {campaign.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {campaign.status === "running" ? (
                      <DropdownMenuItem className="text-amber-600 focus:text-amber-600">
                        <Pause className="mr-2 h-4 w-4" />
                        Pause campaign
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-emerald-600 focus:text-emerald-600">
                        <Play className="mr-2 h-4 w-4" />
                        Resume campaign
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
