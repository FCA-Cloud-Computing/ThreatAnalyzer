"use client"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface RecentLookupsProps {
  lookups: any[]
  loading: boolean
}

export function RecentLookups({ lookups, loading }: RecentLookupsProps) {
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Lookups</h2>
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
                  variant={
                    lookup.result.positives > 0
                      ? "destructive"
                      : "secondary"
                  }
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
    </Card>
  )
}