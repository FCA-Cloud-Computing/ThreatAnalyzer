"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface ReputationCardProps {
  positives: number
  total: number
}

export function ReputationCard({ positives, total }: ReputationCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Reputation Score</h4>
        <span className={`text-lg font-bold ${
          positives > 0 ? 'text-red-500' : 'text-green-500'
        }`}>
          {positives} / {total}
        </span>
      </div>
      {positives > 0 ? (
        <AlertTriangle className="h-8 w-8 text-red-500 mt-2" />
      ) : (
        <CheckCircle className="h-8 w-8 text-green-500 mt-2" />
      )}
    </Card>
  )
}