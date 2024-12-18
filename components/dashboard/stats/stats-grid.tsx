"use client"

import { Shield, AlertTriangle, Bug, Search } from "lucide-react"
import { StatCard } from "./stat-card"

interface StatsGridProps {
  metrics: {
    totalScans: number
    maliciousCount: number
    cleanCount: number
    suspiciousCount: number
  }
}

export function StatsGrid({ metrics }: StatsGridProps) {
  const stats = [
    {
      title: "Total Scans",
      value: metrics.totalScans.toString(),
      icon: Search,
      description: "All-time lookups",
    },
    {
      title: "Malicious Indicators",
      value: metrics.maliciousCount.toString(),
      icon: AlertTriangle,
      description: "Confirmed threats",
    },
    {
      title: "Clean Indicators",
      value: metrics.cleanCount.toString(),
      icon: Shield,
      description: "Verified safe",
    },
    {
      title: "Suspicious",
      value: metrics.suspiciousCount.toString(),
      icon: Bug,
      description: "Requires investigation",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}