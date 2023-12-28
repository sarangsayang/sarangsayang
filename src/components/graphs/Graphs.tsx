'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { trpc } from '@/trpc/client'
import PageVisits from './pagevisits/PageVisits'
import { Loader } from 'lucide-react'
import VendorLikes from './vendorlikes/VendorLikes'
import Enquiries from './enquiries/Enquiries'

interface GraphProps {
    userId: string
}

const Graphs = ({userId}: GraphProps) => {
    const vendor = trpc.getVendorId.useQuery({
        userId: userId
    }).data

  return (
    <>
        <Card>
            {vendor ? <PageVisits vendorId={vendor.id}/> : <Loader className='py-4'/>}
        </Card>

        <Card>
            {vendor ? <VendorLikes vendorId={vendor.id}/> : <Loader className='py-4'/>}
        </Card>

        <Card>
            {vendor ? <Enquiries vendorId={vendor.id}/> : <Loader className='py-4'/>}
        </Card>
    </>
  )
}

export default Graphs