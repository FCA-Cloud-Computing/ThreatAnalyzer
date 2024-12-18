"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Detection {
  url?: string
  ip?: string
  hash?: string
  positives: number
  total: number
  scan_date: string
}

interface DetectionHistoryProps {
  detections: Detection[]
  type: "domain" | "ip" | "hash"
}

export function DetectionHistory({ detections, type }: DetectionHistoryProps) {
  if (!detections?.length) return null

  return (
    <div className="mt-6">
      <h4 className="font-medium mb-2">Detection History</h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{type.toUpperCase()}</TableHead>
            <TableHead>Positives</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Scan Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {detections.map((detection, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono">
                {detection.url || detection.ip || detection.hash}
              </TableCell>
              <TableCell>{detection.positives}</TableCell>
              <TableCell>{detection.total}</TableCell>
              <TableCell>
                {new Date(detection.scan_date).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}