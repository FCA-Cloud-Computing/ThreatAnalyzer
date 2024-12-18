"use client"

import { Card } from "@/components/ui/card"

interface CategoriesCardProps {
  categories: Record<string, string>
}

export function CategoriesCard({ categories }: CategoriesCardProps) {
  return (
    <Card className="p-4">
      <h4 className="font-medium mb-2">Categories</h4>
      <div className="space-y-1">
        {Object.entries(categories || {}).map(([engine, category]) => (
          <div key={engine} className="text-sm">
            <span className="font-medium">{engine}:</span> {category}
          </div>
        ))}
      </div>
    </Card>
  )
}