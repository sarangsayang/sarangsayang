'use client'

import { User } from '@/payload-types'
import { Sheet } from './ui/sheet'
import { trpc } from '@/trpc/client'
import { Loader } from 'lucide-react'
import EnquiriesContentCont from './EnquiriesContentCont'

const Enquiries = ({ user }: { user: User }) => {
    const vendor = trpc.getVendorId.useQuery({
        userId: user.id
    }).data

  return (
    
    <Sheet>
        {vendor ? <EnquiriesContentCont vendorId={vendor.docs[0].id} role={user.role}/> : <Loader className="animate-spin"/>}
    </Sheet>
  )
}

export default Enquiries