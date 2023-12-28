'use client'

import EnquiriesTrigger from './EnquiriesTrigger'
import EnquiriesDataPull from './EnquiriesDataPull'
import { trpc } from '@/trpc/client'
import { SheetContent, SheetTrigger } from './ui/sheet'


interface EnquiriesContentContProps {
    vendorId: string, 
    role: string
}

const EnquiriesContentCont = ({vendorId, role}: EnquiriesContentContProps) => {
    const leads = trpc.getLeads.useQuery({
        vendorId: vendorId
    })

  return (
    <>
        <SheetTrigger className='group -m-2 flex items-center p-2'>
            {leads && leads.data ? <EnquiriesTrigger leads={leads.data} itemCount={leads.data.length}/> : null}
        </SheetTrigger>
        <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
            {leads && leads.data ? <EnquiriesDataPull leads={leads.data} itemCount={leads.data.length} role={role}/> : null}
        </SheetContent>
    </>
  )
}

export default EnquiriesContentCont