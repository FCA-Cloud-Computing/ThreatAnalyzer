"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface TimelineData {
  date: string
  count: number
  malicious: number
}

interface TypeData {
  name: string
  value: number
}

interface ThreatMetricsProps {
  data: Array<{
    timestamp: string
    type: string
    result: {
      positives: number
    }
  }>
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))']

export function ThreatMetrics({ data }: ThreatMetricsProps) {
  // Process data for timeline chart
  const timelineData: TimelineData[] = data.reduce((acc: TimelineData[], curr) => {
    const date = new Date(curr.timestamp).toLocaleDateString()
    const existing = acc.find(item => item.date === date)
    if (existing) {
      existing.count++
      if (curr.result.positives > 0) existing.malicious++
    } else {
      acc.push({
        date,
        count: 1,
        malicious: curr.result.positives > 0 ? 1 : 0
      })
    }
    return acc
  }, [])

  // Process data for type distribution
  const typeData: TypeData[] = data.reduce((acc: TypeData[], curr) => {
    const existing = acc.find(item => item.name === curr.type)
    if (existing) {
      existing.value++
    } else {
      acc.push({ name: curr.type, value: 1 })
    }
    return acc
  }, [])

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Lookup Timeline</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date"
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis
                stroke="hsl(var(--foreground))"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--primary))" 
                name="Total Lookups"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="malicious" 
                stroke="hsl(var(--destructive))" 
                name="Malicious"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Indicator Type Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {typeData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}