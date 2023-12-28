import PriceRange from "@/components/sales/PriceRange"
import { cookies } from "next/headers"
import { getServerSideUser } from '@/lib/payload-utils'
import { Loader } from "lucide-react"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { cn } from "@/lib/utils"


export default async function Status() {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    const vendorRole = user?.role
    //var vendorRole = 'platinum'

    const bgVendor = vendorRole === 'vendor' ? 'bg-blue-300' : 'bg-yellow-300'

    function role(role: string) {
        if (role === 'vendor') {
            return {
                label: 'Offical Vendor', 
                desc: `Thanks for joining! Try being a Supervendor today`
            }
        } else if (role === 'supervendor') {
            return {
                label: 'Standard Supervendor', 
                desc: `Congrats! You'll maintain being a Supervendor till your subscription ends`
            }
        } else if (role === 'platinum') {
            return {
                label: 'Platinum Supervendor', 
                desc: `Fantastic!`
            }
        } else if (role === 'elite') {
            return {
                label: 'Elite Supervendor', 
                desc: `Wow.. Awesome!`
            }
        }
    }

    return (
        <>
            <MaxWidthWrapper className={cn(bgVendor, 'mt-20 h-full rounded-lg shadow-md')}>
                {user && vendorRole ? <div className="py-10 flex flex-col items-start">
                    <h1 className="text-4xl font-medium py-2 flex items-baseline gap-2">
                        <span className="text-2xl font-light">You&apos;re our</span> {role(vendorRole)?.label}
                    </h1>
                    <p className="text-gray-600 italic w-100">{role(vendorRole)?.desc}</p>
                </div>: <Loader />}
            </MaxWidthWrapper>
            {user && vendorRole ? <PriceRange userRole={vendorRole} userId={user.id}/> : <Loader />}
            
        </>
    )
}
