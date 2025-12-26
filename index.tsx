"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { QrCode, Users, DollarSign, CheckCircle } from 'lucide-react'

// TODO: Initialize Supabase client only when needed in useEffect
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

const sampleData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Apr', sales: 200 },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="bg-neutral-900/70"><CardContent className="p-4"><div className="flex items-center gap-2"><Users className="h-5 w-5"/> <div><div className="text-sm">Attendees</div><div className="font-bold">1,234</div></div></div></CardContent></Card>
        <Card className="bg-neutral-900/70"><CardContent className="p-4"><div className="flex items-center gap-2"><QrCode className="h-5 w-5"/> <div><div className="text-sm">Checked-in</div><div className="font-bold">987</div></div></div></CardContent></Card>
        <Card className="bg-neutral-900/70"><CardContent className="p-4"><div className="flex items-center gap-2"><DollarSign className="h-5 w-5"/> <div><div className="text-sm">Revenue</div><div className="font-bold">$45,670</div></div></div></CardContent></Card>
        <Card className="bg-neutral-900/70"><CardContent className="p-4"><div className="flex items-center gap-2"><CheckCircle className="h-5 w-5"/> <div><div className="text-sm">Confirmed</div><div className="font-bold">1,100</div></div></div></CardContent></Card>
      </div>

      <Card className="bg-neutral-900/70 p-4">
        <CardContent>
          <h2 className="mb-4 text-xl font-semibold">Sales (sample)</h2>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={sampleData}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="sales" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-2">
        <Button onClick={() => alert('Refresh data (not implemented)')} className="rounded-md">Refresh</Button>
        <Button variant="outline" onClick={() => alert('Export CSV (not implemented)')} className="rounded-md">Export</Button>
      </div>
    </div>
  )
}
