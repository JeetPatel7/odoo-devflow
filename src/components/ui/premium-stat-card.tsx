/**
 * Premium dashboard card component
 * Displays key metrics with trend indicators and actions
 */

"use client";

import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, MoreVertical } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface PremiumStatCardProps {
  icon?: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: "up" | "down";
    period: string;
  };
  bgColor?: string;
  textColor?: string;
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
  isLoading?: boolean;
}

export function PremiumStatCard({
  icon,
  title,
  value,
  subtitle,
  trend,
  bgColor = "bg-blue-50",
  textColor = "text-blue-600",
  actions = [],
  isLoading = false,
}: PremiumStatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && <div className={`text-2xl ${textColor}`}>{icon}</div>}
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          </div>

          {isLoading ? (
            <div className="h-8 bg-gray-300 rounded animate-pulse mb-2"></div>
          ) : (
            <p className={`text-3xl font-bold ${textColor} mb-2`}>{value}</p>
          )}

          {subtitle && (
            <p className="text-xs text-gray-600 mb-3">{subtitle}</p>
          )}

          {trend && (
            <div
              className={`inline-flex items-center gap-1 text-xs font-semibold ${
                trend.direction === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {trend.direction === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {trend.value}% {trend.period}
            </div>
          )}
        </div>

        {actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-600"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map((action) => (
                <DropdownMenuItem
                  key={action.label}
                  onClick={action.onClick}
                >
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
