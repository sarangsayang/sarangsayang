'use client'

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { trpc } from "@/trpc/client"
import { FolderSearch } from "lucide-react"
import TEDataPull from "./TEDataPull"

interface TEContProps {
    userId: string
}

const TECont = ({userId} : TEContProps) => {
    const vendorId = trpc.getVendorId.useQuery({
        userId: userId
    }).data

    const vendor = vendorId ? vendorId.id : console.log('Loading Vendor ID')
  return (
    <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Total Enquiries
            </CardTitle>
            <FolderSearch />
        </CardHeader>
        <CardContent>
            {vendor ? <TEDataPull vendorId={vendor} /> : null}
        </CardContent>
    </>
  )
}

export default TECont