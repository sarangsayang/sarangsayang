'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/trpc/client'
import { BookHeart } from 'lucide-react'
import TVLDataPull from './TVLDataPull'

interface TotalVendorLikesProps {
    userId: string
}

const TotalVendorLikes = ({userId} : TotalVendorLikesProps) => {
    const vendorId = trpc.getVendorId.useQuery({
        userId: userId
    }).data

    const vendor = vendorId ? vendorId.id : console.log('Loading Vendor ID')
  return (
    <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Total Vendor Likes
            </CardTitle>
            <BookHeart />
        </CardHeader>
        <CardContent>
        {vendor ? <TVLDataPull vendorId={vendor} /> : null}
        </CardContent>
    </>
  )
}

export default TotalVendorLikes