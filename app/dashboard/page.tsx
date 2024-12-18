"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentLookups } from "@/components/dashboard/recent-lookups"
import { ThreatMetrics } from "@/components/dashboard/threat-metrics"
import { ThreatMap } from "@/components/dashboard/threat-map"
import { DashboardFilters } from "@/components/dashboard/dashboard-filters"
import { StatsGrid } from "@/components/dashboard/stats/stats-grid"
import { useToast } from "@/hooks/use-toast"
import { threats } from "@/lib/api"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [lookupHistory, setLookupHistory] = useState([])
  const [metrics, setMetrics] = useState({
    totalScans: 0,
    maliciousCount: 0,
    cleanCount: 0,
    suspiciousCount: 0
  })
  const { toast } = useToast()

  const fetchData = async (filters = {}) => {
    try {
      setLoading(true)
      const response = await threats.getLookupHistory(null, filters)
      setLookupHistory(response.items)
      setMetrics(response.metrics)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleFilterChange = (filters: any) => {
    fetchData(filters)
  }

  return (
    <div className="space-y-8">
      <DashboardFilters onFilterChange={handleFilterChange} />
      <StatsGrid metrics={metrics} />

      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="metrics">Threat Metrics</TabsTrigger>
          <TabsTrigger value="map">Geographic Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="recent">
          <RecentLookups lookups={lookupHistory} loading={loading} />
        </TabsContent>

        <TabsContent value="metrics">
          <ThreatMetrics data={lookupHistory} />
        </TabsContent>

        <TabsContent value="map">
          <ThreatMap data={lookupHistory} />
        </TabsContent>
      </Tabs>
    </div>
  )
}