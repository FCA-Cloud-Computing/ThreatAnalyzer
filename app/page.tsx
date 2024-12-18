"use client"

import { Button } from "@/components/ui/button"
import { Shield, Activity, FileBarChart } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center space-y-12 text-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold sm:text-6xl">
          Cyber Threat Intelligence Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Advanced threat detection and analysis platform for modern cybersecurity challenges.
          Monitor, analyze, and respond to cyber threats in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
          <Shield className="h-12 w-12 text-primary" />
          <h2 className="text-xl font-semibold">Threat Detection</h2>
          <p className="text-muted-foreground">Real-time monitoring and detection of cyber threats</p>
        </div>

        <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
          <Activity className="h-12 w-12 text-primary" />
          <h2 className="text-xl font-semibold">Live Analysis</h2>
          <p className="text-muted-foreground">Advanced analytics and visualization of threat data</p>
        </div>

        <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
          <FileBarChart className="h-12 w-12 text-primary" />
          <h2 className="text-xl font-semibold">Detailed Reports</h2>
          <p className="text-muted-foreground">Comprehensive threat intelligence reporting</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button size="lg">
            Open Dashboard
          </Button>
        </Link>
        <Link href="/threats">
          <Button variant="outline" size="lg">
            View Threats
          </Button>
        </Link>
      </div>
    </div>
  )
}