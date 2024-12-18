"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { threats } from "@/lib/api"

export function BulkLookupForm() {
  const [indicators, setIndicators] = useState("")
  const [lookupType, setLookupType] = useState("domain")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const items = indicators
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean)

    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one indicator",
        variant: "destructive",
      })
      return
    }

    if (items.length > 100) {
      toast({
        title: "Error",
        description: "Maximum 100 indicators allowed per bulk lookup",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)
      const results = await threats.bulkLookup(items, lookupType)
      toast({
        title: "Success",
        description: `Processed ${results.length} indicators`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process bulk lookup",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Bulk Lookup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Select
            value={lookupType}
            onValueChange={setLookupType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="domain">URLs/Domains</SelectItem>
              <SelectItem value="ip">IP Addresses</SelectItem>
              <SelectItem value="hash">File Hashes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder={`Enter one ${lookupType} per line (max 100)`}
          value={indicators}
          onChange={(e) => setIndicators(e.target.value)}
          rows={10}
          className="font-mono"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Processing..." : "Submit Bulk Lookup"}
        </Button>
      </form>
    </Card>
  )
}