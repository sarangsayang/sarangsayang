'use client'

import { trpc } from "@/trpc/client"
import CRMDataPull from "./CRMDataPull"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table"
import CRMAddLead from "./CRMAddLead"

interface CRMContProps {
    userId: string
    role: string
}

const CRMCont = ({userId, role}: CRMContProps) => {
    const vendorId = trpc.getVendorId.useQuery({
        userId: userId
    }).data

    const vendor = vendorId ? vendorId.id : console.log('Loading Vendor ID')

  return (
    <>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date Created</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vendor ? <CRMAddLead vendorId={vendor} /> : null}
                {vendor ? <CRMDataPull vendorId={vendor} role={role} /> : null}
            </TableBody>
        </Table>
    </>
  )
}

export default CRMCont