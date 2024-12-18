"use client"

import { Card } from "@/components/ui/card"

interface ThreatMapProps {
  data: any[]
}

export function ThreatMap({ data }: ThreatMapProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">
          Geographic visualization coming soon...
        </p>
      </div>
    </Card>
  )
}