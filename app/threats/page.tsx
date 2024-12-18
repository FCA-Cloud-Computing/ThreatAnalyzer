"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { threats } from "@/lib/api"
import { LookupForm } from "@/components/threats/lookup-form"
import { BulkLookupForm } from "@/components/threats/bulk-lookup-form"
import { ReputationCard } from "@/components/threats/results/reputation-card"
import { CategoriesCard } from "@/components/threats/results/categories-card"
import { AnalysisStatsCard } from "@/components/threats/results/analysis-stats-card"
import { DetectionHistory } from "@/components/threats/results/detection-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ThreatsPage() {
  const [loading, setLoading] = useState(false)
  const [lookupResult, setLookupResult] = useState<any>(null)
  const [lookupType, setLookupType] = useState<"domain" | "ip" | "hash">("domain")
  const { toast } = useToast()

  const handleLookup = async (query: string, type: string) => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a value to check",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      setLookupType(type as "domain" | "ip" | "hash")
      const result = await threats.lookup(query, type)
      setLookupResult(result)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to lookup threat",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="single" className="space-y-6">
        <TabsList>
          <TabsTrigger value="single">Single Lookup</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Lookup</TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Threat Intelligence Lookup</h2>
            <LookupForm onSubmit={handleLookup} loading={loading} />

            {lookupResult && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Results for: {lookupResult.query || "N/A"}
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <ReputationCard
                    positives={lookupResult.positives || 0}
                    total={lookupResult.total || 0}
                  />
                  <CategoriesCard categories={lookupResult.categories || {}} />
                  <AnalysisStatsCard
                    stats={lookupResult.last_analysis_stats || {}}
                  />
                </div>

                <DetectionHistory
                  detections={lookupResult.detected_urls || 
                            lookupResult.detected_ips || 
                            lookupResult.detected_files || 
                            []}
                  type={lookupType}
                />
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <BulkLookupForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}