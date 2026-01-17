"use client";

import { Mail, BookOpen, MessageSquare, Calendar } from "lucide-react";
import {
  AnalyticsKpiRow,
  AnalyticMetric,
} from "@/components/analytics/AnalyticsKpiRow";
import { AnalyticsFunnel } from "@/components/analytics/AnalyticsFunnel";
import {
  CampaignPerformanceTable,
  Campaign,
} from "@/components/analytics/CampaignPerformanceTable";
import { Separator } from "@/components/ui/separator";

// Mock Data
const kpiMetrics: AnalyticMetric[] = [
  {
    label: "Sent",
    value: "12,450",
    change: "+12%",
    trend: "up",
    icon: Mail,
    color: "text-muted-foreground",
  },
  {
    label: "Opened",
    value: "5,210",
    change: "+4.5%",
    trend: "up",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    label: "Replied",
    value: "840",
    change: "-2.1%",
    trend: "down",
    icon: MessageSquare,
    color: "text-emerald-500",
  },
  {
    label: "Meetings Booked",
    value: "142",
    change: "+18%",
    trend: "up",
    icon: Calendar,
    color: "text-indigo-500",
  },
];

const funnelStages = [
  {
    label: "Sent",
    count: 12450,
    percentage: "100%",
    description: "Total emails sent in the selected period.",
    advice: "Ensure your lead lists are clean to maintain high deliverability.",
    color: "#e2e8f0", // slate-200
  },
  {
    label: "Opened",
    count: 5210,
    percentage: "41.8%",
    description: "Recipients who opened your email at least once.",
    advice: "A/B test subject lines to improve open rates.",
    color: "#3b82f6", // blue-500
  },
  {
    label: "Replied",
    count: 840,
    percentage: "16.1%",
    description: "Recipients who replied to your email.",
    advice: "Personalize your opening line to boost engagement.",
    color: "#10b981", // emerald-500
  },
  {
    label: "Booked",
    count: 142,
    percentage: "16.9%",
    description: "Leads who booked a meeting via your calendar link.",
    advice: "Streamline your call-to-action to remove friction.",
    color: "#6366f1", // indigo-500
  },
];

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 SaaS Outreach - CEO",
    leadList: "SaaS CEOs Series A",
    openRate: 45.2,
    replyRate: 12.5,
    meetingsBooked: 24,
    status: "running",
  },
  {
    id: "2",
    name: "Marketing Directors - NY",
    leadList: "Mktg Dirs NY >50 Employees",
    openRate: 38.1,
    replyRate: 8.4,
    meetingsBooked: 12,
    status: "paused",
  },
  {
    id: "3",
    name: "Webinar Invite - March",
    leadList: "Newsletter Subscribers",
    openRate: 62.0,
    replyRate: 21.3,
    meetingsBooked: 45,
    status: "completed",
  },
  {
    id: "4",
    name: "Follow-up Sequence",
    leadList: "Non-responders Q4",
    openRate: 28.5,
    replyRate: 5.2,
    meetingsBooked: 8,
    status: "running",
  },
  {
    id: "5",
    name: "Enterprise Account Expansion",
    leadList: "Current Customers Tier 1",
    openRate: 72.4,
    replyRate: 35.1,
    meetingsBooked: 18,
    status: "running",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Campaign Analytics
          </h2>
          <p className="text-muted-foreground">
            Monitor your outreach performance and ROI.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* KPI Section */}
        <section>
          <AnalyticsKpiRow metrics={kpiMetrics} />
        </section>

        <Separator className="my-6" />

        {/* Funnel Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Conversion Funnel</h3>
          </div>
          <AnalyticsFunnel stages={funnelStages} />
        </section>

        <Separator className="my-6" />

        {/* Campaign Table Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Campaign Performance</h3>
          </div>
          <CampaignPerformanceTable campaigns={campaigns} />
        </section>
      </div>
    </div>
  );
}
