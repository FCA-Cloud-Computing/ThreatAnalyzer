"use client"

import { Card } from "@/components/ui/card"

interface AnalysisStatsCardProps {
  stats: Record<string, number>
}

export function AnalysisStatsCard({ stats }: AnalysisStatsCardProps) {
  return (
    <Card className="p-4">
      <h4 className="font-medium mb-2">Last Analysis Stats</h4>
      <div className="space-y-2">
        {Object.entries(stats || {}).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}