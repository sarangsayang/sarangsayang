import { trpc } from "@/trpc/client"
import { TableCell, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Delete, Loader } from "lucide-react"
import { priorities, statuses } from "@/app/data/data"
import { Sheet, SheetContent } from "../ui/sheet"
import { useState } from "react"
import CRMEditLead from "./CRMEditLead"
import { Skeleton } from "../ui/skeleton"

interface CRMDataPullProps {
    vendorId: string
    role: string
}

function getLead(string: string) {
    const lead = trpc.getLead.useQuery({
        id: string
    })

    if (lead.status === 'loading') {
        return <Loader />
    } else if (lead.status === 'success' && lead.data) {
        return <CRMEditLead lead={lead.data} />
    }
}

const CRMDataPull = ({vendorId, role}: CRMDataPullProps) => {
    const leads = trpc.getLeads.useQuery({
        vendorId: vendorId
    }).data

    const removeLead = trpc.removeLead.useMutation()

    const statusAndIcon = (string: string) => {
        const status = statuses.find(
            (status) => status.value === string
          )
    
          if (!status) {
            return null
          }
    
          return (
            <div className="flex w-[100px] items-center gap-1">
              {status.icon2}
              <span>{status.label}</span>
            </div>
          )
    }

    const priorityAndIcon = (string: string) => {
        const priority = priorities.find(
            (priority) => priority.value === string
          )
    
          if (!priority) {
            return null
          }
    
          return (
            <div className="flex w-[100px] items-center gap-1">
              {priority.icon2}
              <span>{priority.label}</span>
            </div>
          )
    }

    const [open, setOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState('')

    function changeDateFormat(string: string) {
        const dateString = string
        const dateObject = dateString.substring(0,10)
        return dateObject
    }

    const isSuperVendor = role === 'supervendor'

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        {leads?.map((lead) => (
          lead.source === 'Sarang Sayang' && !isSuperVendor ? 
            <TableRow key={lead.createdAt}>
              <TableCell>{changeDateFormat(lead.createdAt)}</TableCell>
              <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
              <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
              <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
              <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
              <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
              <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
           : 
            <TableRow key={lead.createdAt} className="cursor-pointer" onClick={() => [setOpen(true), setRowSelection(''), setRowSelection(lead.id)]}>
                <TableCell>{changeDateFormat(lead.createdAt)}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.contact}</TableCell>
                <TableCell>{lead.message}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{statusAndIcon(lead.status)}</TableCell>
                <TableCell>{priorityAndIcon(lead.priority)}</TableCell>
                <TableCell>{lead.remarks}</TableCell>
                <TableCell>
                    <Button variant='ghost' onClick={() => {
                        removeLead.mutate({
                            leadId: lead.id
                        })
                    }}>
                        <Delete className="text-rose-400"/>
                    </Button>
                </TableCell>
            </TableRow>
          
        ))}
        <SheetContent side={"bottom"}>
            {getLead(rowSelection)}
        </SheetContent>
    </Sheet>
  )
}

export default CRMDataPull