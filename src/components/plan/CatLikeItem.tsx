'use client'

import { trpc } from "@/trpc/client"
import { Loader } from "lucide-react"
import Link from "next/link"

interface CatLikeItemProps {
    category: string
    data: Data[]
    icon: any
    label: string
}

interface Data {
    vendorId: string
}

const CatLikeItem = ({category, data, icon, label}: CatLikeItemProps) => {
    let results = (
        <p className="text-slate-600 italic">No likes found!</p>
    )

    let itemCount = 0
    data.forEach((data) => {
        const vendorId = data.vendorId

        

        const vendors = trpc.getVendor.useQuery({
            id: vendorId
        }) 

        if (vendors.status === 'loading') {
            <Loader />
        } else if (vendors.status === 'success') {
            const vendor = vendors.data
            

            if (vendor?.category === category) {
                results = (
                <Link href={`/vendor/${vendor.id}`}>
                    <p className="hover:text-gray-700">{vendor.name}</p>
                </Link>
                )
                itemCount++
                
            }
        }
    })

    return (
        <>
            <div className='md:flex md:items-center md:justify-between mb-4 '>
                <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
                    <h3 className='flex items-center gap-3 text-xl font-semibold text-gray-900 sm:text-3xl'>
                        <span>{icon}</span> {label}
                    </h3>
                    <p className="text-md font-light mt-1">
                        {itemCount} {itemCount === 1 ? (<span>{"vendor found"}</span>) : (<span>{"vendors found"}</span>)}
                    </p>
                </div>
            </div>
            {results}
        </>
    )
}

export default CatLikeItem