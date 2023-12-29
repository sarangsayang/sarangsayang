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
    const getVendorId = trpc.getVendorId.useQuery({
        userId: userId
    })

    const vendorId = getVendorId.data?.docs[0].id

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
                {vendorId ? <CRMAddLead vendorId={vendorId} /> : null}
                {vendorId ? <CRMDataPull vendorId={vendorId} role={role} /> : null}
            </TableBody>
        </Table>
    </>
  )
}

export default CRMCont