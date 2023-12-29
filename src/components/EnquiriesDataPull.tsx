import { Separator } from "@radix-ui/react-dropdown-menu"
import { ScrollArea } from "./ui/scroll-area"
import { SheetHeader, SheetTitle } from "./ui/sheet"
import { Skeleton } from "./ui/skeleton"

interface EnquiriesDataPullProps {
    leads: Lead[]
    itemCount: number
    role: string
}

interface Lead {
    source: string
    name: string
    status: string
    email: string
    contact: string
    createdAt: string
    id: string
}

const EnquiriesDataPull = ({leads, itemCount, role}: EnquiriesDataPullProps) => {
    const isSuperVendor = role !== 'vendor'
  return (
    <>
        <SheetHeader className='space-y-2.5 pr-6'>
            <SheetTitle>Enquiries ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
            <div className='flex w-full flex-col pr-6'>
                <ScrollArea>
                    {leads.map(( lead ) => (
                        lead.source === 'Sarang Sayang' && !isSuperVendor ? 
                        <div key={lead.id}>
                            <div className='space-y-3 py-2'>
                                <div className='flex items-start justify-between gap-4'>
                                    <div className='flex items-center space-x-4'>
                                        <div className='flex flex-col self-start'>
                                            <span className='line-clamp-1 text-sm font-medium mb-2'>
                                                <Skeleton className="w-[100px] h-[20px] rounded-full"/>
                                            </span>

                                            <span className='line-clamp-1 capitalize text-xs text-muted-foreground mb-1'>
                                                <Skeleton className="w-[200px] h-[15px] rounded-full"/>
                                            </span>
                                            <span className='line-clamp-1 text-xs text-muted-foreground mb-1'>
                                                <Skeleton className="w-[200px] h-[15px] rounded-full"/>
                                            </span>
                                            <span className='line-clamp-1 text-xs text-muted-foreground mb-1'>
                                                <Skeleton className="w-[200px] h-[15px] rounded-full"/>
                                            </span>
                                            <span className='line-clamp-1 text-xs text-muted-foreground'>
                                                Source: {lead.source}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-1 font-medium'>
                                        <span className='ml-auto line-clamp-1 text-sm'>
                                            {lead.createdAt.substring(0,10)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : 
                        <div key={lead.id}>
                            <div  className='space-y-3 py-2'>
                                <div className='flex items-start justify-between gap-4'>
                                    <div className='flex items-center space-x-4'>
                                        <div className='flex flex-col self-start'>
                                            <span className='line-clamp-1 text-sm font-medium mb-1'>
                                                {lead.name}
                                            </span>

                                            <span className='line-clamp-1 capitalize text-xs text-muted-foreground'>
                                                Status: {lead.status}
                                            </span>
                                            <span className='line-clamp-1 text-xs text-muted-foreground'>
                                                Email: {lead.email}
                                            </span>
                                            <span className='line-clamp-1 text-xs text-muted-foreground'>
                                                Contact: {lead.contact}
                                            </span>
                                            <span className='line-clamp-1 text-xs text-muted-foreground'>
                                                Source: {lead.source}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-1 font-medium'>
                                        <span className='ml-auto line-clamp-1 text-sm'>
                                            {lead.createdAt.substring(0,10)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
        ) : (
            <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div className='text-xl font-semibold'>
                    No enquiries yet!
                </div>
            </div>
        )}
    </>
  )
}

export default EnquiriesDataPull