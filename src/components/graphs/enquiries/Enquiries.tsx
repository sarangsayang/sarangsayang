'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { trpc } from "@/trpc/client"
import BarGraph2 from "./BarGraph2"

interface EnquiriesProps {
  vendorId: string
}

const Enquiries = ({vendorId}: EnquiriesProps) => {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    const currentMonthData = trpc.getEnquiriesThisMonth.useQuery({
        month: currentMonth,
        year: currentYear,
        vendorId: vendorId
    })

    const graphData = trpc.getEnquiries12M.useQuery({
        month: currentMonth,
        year: currentYear,
        vendorId: vendorId
    }).data

  return (
    <>
      <CardHeader>
            <CardTitle>Enquiries</CardTitle>
            <CardDescription>
            {currentMonthData.data ? <CardDescription>
                Your vendor collected {currentMonthData.data.length} enquiries this month.
            </CardDescription> : null}
            </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="h-[500px] mt-7">
            {graphData ? <BarGraph2 data={graphData}/> : null}
          </div>
        </CardContent>
    </>
  )
}

export default Enquiries