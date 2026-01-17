"use client";

import * as React from "react";
import {
  Archive,
  ArrowUpDown,
  Bot,
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import { cn } from "@/lib/utils";

// Mock Data
const LEADS = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechFlow",
    logo: "/placeholder.svg?height=32&width=32",
    email: "sarah@techflow.io",
    verified: true,
    score: 98,
    status: "New",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Michael Ross",
    role: "Founder & CEO",
    company: "DataSphere",
    logo: "/placeholder.svg?height=32&width=32",
    email: "m.ross@datasphere.ai",
    verified: true,
    score: 95,
    status: "New",
    location: "New York, NY",
  },
  {
    id: "3",
    name: "Jessica Wu",
    role: "Head of Product",
    company: "CloudScale",
    logo: "/placeholder.svg?height=32&width=32",
    email: "jwu@cloudscale.com",
    verified: false,
    score: 88,
    status: "Contacted",
    location: "Austin, TX",
  },
  {
    id: "4",
    name: "David Miller",
    role: "CTO",
    company: "Nexus Systems",
    logo: "/placeholder.svg?height=32&width=32",
    email: "david@nexus.dev",
    verified: true,
    score: 92,
    status: "New",
    location: "Boston, MA",
  },
  {
    id: "5",
    name: "Emily Zhang",
    role: "Director of Sales",
    company: "GrowthPad",
    logo: "/placeholder.svg?height=32&width=32",
    email: "emily@growthpad.io",
    verified: true,
    score: 85,
    status: "Qualified",
    location: "Seattle, WA",
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Founder",
    company: "StartMax",
    logo: "/placeholder.svg?height=32&width=32",
    email: "james@startmax.co",
    verified: true,
    score: 94,
    status: "New",
    location: "London, UK",
  },
  {
    id: "7",
    name: "Lisa Anderson",
    role: "VP Marketing",
    company: "Brandify",
    logo: "/placeholder.svg?height=32&width=32",
    email: "lisa@brandify.com",
    verified: false,
    score: 78,
    status: "Contacted",
    location: "Chicago, IL",
  },
  {
    id: "8",
    name: "Robert Taylor",
    role: "CEO",
    company: "FinTech Sol",
    logo: "/placeholder.svg?height=32&width=32",
    email: "robert@fintechsol.net",
    verified: true,
    score: 91,
    status: "New",
    location: "Toronto, ON",
  },
  {
    id: "9",
    name: "Amanda Martinez",
    role: "Head of Growth",
    company: "ScaleUp",
    logo: "/placeholder.svg?height=32&width=32",
    email: "amanda@scaleup.io",
    verified: true,
    score: 89,
    status: "Qualified",
    location: "Miami, FL",
  },
  {
    id: "10",
    name: "Thomas Brown",
    role: "Co-Founder",
    company: "InnovateX",
    logo: "/placeholder.svg?height=32&width=32",
    email: "tom@innovatex.page",
    verified: true,
    score: 96,
    status: "New",
    location: "Berlin, DE",
  },
];

export default function LeadDiscoveryPage() {
  const [selectedLeads, setSelectedLeads] = React.useState<string[]>([]);
  const [companySize, setCompanySize] = React.useState([10, 500]);

  const toggleLead = (id: string) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedLeads((prev) =>
      prev.length === LEADS.length ? [] : LEADS.map((l) => l.id)
    );
  };

  return (
    <SidebarProvider>
      <SideNav />
      <SidebarInset>
        <div className="flex flex-col h-full bg-primary text-primary-foreground">
          {/* Header & Navbar */}
          <div className="flex flex-col border-b border-white/10 bg-primary z-10">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1 className="text-lg font-semibold">Lead Discovery</h1>
              </div>
              <div className="flex-1 max-w-xl mx-4 pt-2relative hidden md:block">
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 animate-pulse" />
                  <Input
                    placeholder="Ask AI: 'B2B SaaS founders in US, 10-50 employees...'"
                    className="pl-10 h-10 bg-white/10 border-white/10 text-white placeholder:text-background/50 focus-visible:ring-white/20 focus-visible:border-white/50 transition-all font-medium"
                  />
                  <span className="absolute  right-3 top-1/2 -translate-y-1/2 text-[13px] text-primary bg-muted px-1.5 py-0.5 rounded border">
                    ⌘ K
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex text-primary"
                >
                  <Download className="mr-2 h-4 w-4 text-primary" />
                  Export
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-500/20"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Search
                </Button>
              </div>
            </header>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Filter Panel */}
            <aside className="w-64 border-r border-white/10 bg-black/10 overflow-y-auto hidden lg:block p-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium leading-none">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-primary-foreground/60 hover:text-white"
                  >
                    Reset
                  </Button>
                </div>

                {/* Industry Filter */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">
                    Industry
                  </h4>
                  <div className="space-y-2">
                    {[
                      "SaaS",
                      "Fintech",
                      "Healthcare",
                      "E-commerce",
                      "AI/ML",
                    ].map((label) => (
                      <div key={label} className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${label}`}
                          className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <label
                          htmlFor={`industry-${label}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Company Size Filter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">
                      Company Size
                    </h4>
                    <span className="text-xs text-primary-foreground/60">
                      {companySize[0]}-{companySize[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[10, 500]}
                    max={1000}
                    step={10}
                    className="[&>.range]:bg-purple-600"
                    onValueChange={setCompanySize}
                  />
                </div>

                <Separator />

                {/* Tech Stack */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <Input
                    placeholder="e.g. React, Node.js"
                    className="h-8 text-xs bg-muted-background/5 border-background text-background placeholder:text-background/40"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {["AWS", "HubSpot"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="px-1.5 py-0.5 text-[10px] font-normal cursor-pointer bg-white/10 text-background hover:bg-white/20 border-transparent"
                      >
                        {tag}
                        <span className="ml-1 hover:text-destructive">×</span>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Seniority */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">
                    Seniority
                  </h4>
                  <div className="space-y-2">
                    {["Founder / C-Level", "VP", "Director", "Manager"].map(
                      (label) => (
                        <div
                          key={label}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`seniority-${label}`}
                            className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                          <label
                            htmlFor={`seniority-${label}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {label}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Results Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-primary overflow-hidden relative">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-primary/50 backdrop-blur-sm z-10 sticky top-0">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="h-7 px-2.5 font-normal text-muted-background bg-primary"
                  >
                    <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                    1,248 Results
                  </Badge>
                  <div className="h-4 w-px bg-border mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-background"
                  >
                    Save Search
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-background hover:bg-background/10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-background hover:bg-background/10"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                <Table className="relative w-full">
                  <TableHeader className="sticky top-0 bg-secondary/10 z-10 backdrop-blur-sm">
                    <TableRow className="bg-background/50 border-b border-border/50">
                      <TableHead className="w-[50px] p-4">
                        <Checkbox
                          checked={
                            selectedLeads.length === LEADS.length &&
                            LEADS.length > 0
                          }
                          onCheckedChange={toggleAll}
                          aria-label="Select all"
                          className="border-white/40 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                      </TableHead>
                      <TableHead className="min-w-[200px] font-bold text-white">
                        Lead
                      </TableHead>
                      <TableHead className="min-w-[150px] font-bold">
                        Company
                      </TableHead>
                      <TableHead className="min-w-[150px] font-bold">
                        Title
                      </TableHead>
                      <TableHead className="min-w-[150px] font-bold">
                        Email
                      </TableHead>
                      <TableHead className="w-[100px] text-right">
                        Score
                      </TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {LEADS.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className={cn(
                          "group transition-colors hover:bg-white/5 data-[state=selected]:bg-white/10 border-b border-white/5",
                          selectedLeads.includes(lead.id) && "bg-white/10"
                        )}
                        data-state={
                          selectedLeads.includes(lead.id) ? "selected" : ""
                        }
                      >
                        <TableCell className="p-4">
                          <Checkbox
                            checked={selectedLeads.includes(lead.id)}
                            onCheckedChange={() => toggleLead(lead.id)}
                            aria-label={`Select ${lead.name}`}
                            className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-white/10">
                              <AvatarImage src={lead.logo} alt={lead.name} />
                              <AvatarFallback className="text-xs font-medium bg-secondary text-secondary-foreground">
                                {lead.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium text-sm text-background">
                                {lead.name}
                              </span>
                              <span className="text-xs text-primary-foreground/60">
                                {lead.location}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-background/10 flex items-center justify-center text-[10px] font-bold text-background ring-1 ring-inset ring-white/10">
                              {lead.company[0]}
                            </div>
                            <span className="text-sm font-medium text-background">
                              {lead.company}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-primary-foreground/70">
                            {lead.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {lead.verified && (
                              <Badge
                                variant="outline"
                                className="h-5 px-1 bg-green-500/10 text-green-600 border-green-500/20 text-[10px] gap-0.5"
                              >
                                Verified
                              </Badge>
                            )}
                            <span className="text-xs text-muted-background truncated max-w-[120px]">
                              {lead.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              "h-6 px-1.5 py-0 font-mono font-medium border-0",
                              lead.score >= 90
                                ? "bg-green-500/15 text-green-600"
                                : lead.score >= 80
                                  ? "bg-amber-500/15 text-amber-600"
                                  : "bg-gray-500/15 text-gray-600"
                            )}
                          >
                            {lead.score}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/10"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Sticky Bottom Action Bar */}
              {selectedLeads.length > 0 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-auto min-w-[400px] max-w-[90%] bg-popover text-popover-foreground shadow-2xl rounded-full border border-border/50 py-2 px-4 flex items-center justify-between gap-4 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary h-6 px-2 rounded-full text-xs font-semibold flex items-center">
                      {selectedLeads.length} Selected
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs hover:text-destructive hover:bg-destructive/10"
                      onClick={toggleAll}
                    >
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                      Clear
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-full text-xs border-primary/20 hover:border-primary/50"
                    >
                      <Archive className="mr-1.5 h-3.5 w-3.5" />
                      Add to List
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 rounded-full text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-500/20"
                    >
                      <Bot className="mr-1.5 h-3.5 w-3.5" />
                      Start Campaign
                    </Button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
