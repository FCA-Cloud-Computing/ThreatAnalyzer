"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { threats } from "@/lib/api"
import { formatDistanceToNow } from "date-fns"

export function LookupHistory() {
  const [lookups, setLookups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [lastKey, setLastKey] = useState(null)
  const { toast } = useToast()

  const loadMore = async () => {
    try {
      setLoading(true)
      const response = await threats.getLookupHistory(lastKey)
      setLookups([...lookups, ...response.items])
      setLastKey(response.last_evaluated_key)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load lookup history",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Lookup History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Indicator</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lookups.map((lookup) => (
            <TableRow key={`${lookup.indicator}-${lookup.timestamp}`}>
              <TableCell className="font-mono">{lookup.indicator}</TableCell>
              <TableCell>
                <Badge variant="outline">{lookup.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={lookup.result.positives > 0 ? "destructive" : "secondary"}
                >
                  {lookup.result.positives} / {lookup.result.total}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(lookup.timestamp), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {lastKey && (
        <div className="mt-4 text-center">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </Card>
  )
}