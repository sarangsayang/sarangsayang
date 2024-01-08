import { trpc } from '@/trpc/client'
import { Loader } from 'lucide-react'
import React from 'react'

interface TEDataPullProps {
    vendorId: string
}

const TEDataPull = ({vendorId}: TEDataPullProps) => {
    const getLeads = trpc.getSSLeads.useQuery({
        vendorId: vendorId
    })

    const leads = getLeads.data?.docs

    const lastMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const lastMonthData = trpc.getSSLeadsThisMonth.useQuery({
      month: lastMonth,
      year: currentYear,
      vendorId: vendorId
    })

    const lastMonthNumbers = lastMonthData.data?.docs.length

    const thisMonthData = trpc.getSSLeadsThisMonth.useQuery({
      month: lastMonth + 1,
      year: currentYear,
      vendorId: vendorId
    })

    const thisMonthNumbers = thisMonthData.data?.docs.length

    function findDifference(lastMonthNumbers: number, thisMonthNumbers: number) {
      const difference = thisMonthNumbers - lastMonthNumbers
      if (difference > 0) {
        return <p className="text-xs text-lime-700 mt-4">+{difference} from last month</p>
      } else if  (difference < 0){
        return <p className="text-xs text-rose-700 mt-4">{difference} from last month</p>
      } else {
        return null
      }
    }

  return (
    <>
        {leads ? (<div className="text-2xl font-bold">{leads.length}</div>) : (<Loader className="animate-spin"/>)}
        {/* @ts-ignore */}
        {findDifference(lastMonthNumbers, thisMonthNumbers)}
    </>
  )
}

export default TEDataPull