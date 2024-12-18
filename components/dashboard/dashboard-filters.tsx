"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"

interface DashboardFiltersProps {
  onFilterChange: (filters: any) => void
}

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [indicator, setIndicator] = useState("")
  const [type, setType] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [result, setResult] = useState("all")

  const applyFilters = () => {
    onFilterChange({
      indicator: indicator.trim(),
      type: type === "all" ? undefined : type,
      dateFrom,
      dateTo,
      result: result === "all" ? undefined : result,
    })
  }

  const clearFilters = () => {
    setIndicator("")
    setType("all")
    setDateFrom(undefined)
    setDateTo(undefined)
    setResult("all")
    onFilterChange({})
  }

  return (
    <Card className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <Input
            placeholder="Search indicator..."
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
          />
        </div>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="domain">Domain</SelectItem>
            <SelectItem value="ip">IP</SelectItem>
            <SelectItem value="hash">Hash</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "PP") : "From date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "PP") : "To date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={result} onValueChange={setResult}>
          <SelectTrigger>
            <SelectValue placeholder="Result" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Results</SelectItem>
            <SelectItem value="malicious">Malicious</SelectItem>
            <SelectItem value="clean">Clean</SelectItem>
            <SelectItem value="suspicious">Suspicious</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </Card>
  )
}