"use client";

import { ArrowDownIcon, ArrowUpIcon, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface AnalyticMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
}

interface AnalyticsKpiRowProps {
  metrics: AnalyticMetric[];
}

export function AnalyticsKpiRow({ metrics }: AnalyticsKpiRowProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className="cursor-pointer hover:shadow-md transition-all border-none shadow-sm bg-background text-primary hover:card"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-primary">
              {metric.label}
            </CardTitle>
            <metric.icon className={cn("h-4 w-4", metric.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {metric.trend === "up" ? (
                <ArrowUpIcon className="mr-1 h-3 w-3 text-emerald-500" />
              ) : metric.trend === "down" ? (
                <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
              ) : null}
              <span
                className={cn(
                  metric.trend === "up"
                    ? "text-emerald-500"
                    : metric.trend === "down"
                      ? "text-red-500"
                      : "",
                )}
              >
                {metric.change}
              </span>
              <span className="ml-1 opacity-70">vs last period</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
