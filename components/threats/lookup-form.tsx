"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LookupFormProps {
  onSubmit: (query: string, type: string) => void
  loading: boolean
}

export function LookupForm({ onSubmit, loading }: LookupFormProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [lookupType, setLookupType] = useState("domain")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(searchQuery, lookupType)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select
          value={lookupType}
          onValueChange={setLookupType}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="domain">URL/Domain</SelectItem>
            <SelectItem value="ip">IP Address</SelectItem>
            <SelectItem value="hash">File Hash</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={
              lookupType === "domain"
                ? "Enter URL or domain (e.g., example.com)"
                : lookupType === "ip"
                ? "Enter IP address (e.g., 8.8.8.8)"
                : "Enter file hash (MD5, SHA-1, SHA-256)"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </Button>
      </div>
    </form>
  )
}