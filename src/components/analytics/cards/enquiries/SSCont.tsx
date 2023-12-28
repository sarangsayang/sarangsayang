'use client'

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { trpc } from "@/trpc/client"
import { FolderHeart } from "lucide-react"
import SSDataPull from "./SSDataPull"

interface SSContProps {
    userId: string
}

const SSCont = ({userId} : SSContProps) => {
    const vendorId = trpc.getVendorId.useQuery({
        userId: userId
    }).data

    const vendor = vendorId ? vendorId.id : console.log('Loading Vendor ID')
  return (
    <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Sarang Sayang Enquiries
            </CardTitle>
            <FolderHeart />
        </CardHeader>
        <CardContent>
            {vendor ? <SSDataPull vendorId={vendor} /> : null}
        </CardContent>
    </>
  )
}

export default SSCont