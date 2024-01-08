'use client'

import { useState } from "react"
import { Switch } from "../ui/switch"
import { BadgeCheck, CheckCircle, Crown, MoveRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { trpc } from "@/trpc/client"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { Button } from "../ui/button"
import { useRouter } from 'next/navigation'
import Link from "next/link"


interface PriceRangeProps {
    userRole: string,
    userId: string,
    portal: string,
    hasSub: boolean,
    checkoutLink: string
}

interface PriceObject {
    monthly: number,
    monthly5: number
}

const PriceRange = async ({userRole, userId, portal, hasSub, checkoutLink}: PriceRangeProps) => {
    const [annually, setAnnually] = useState(false)

    const router = useRouter()

    const vendor = trpc.getVendorId.useQuery({
        userId: userId
    })

    const category = vendor.data?.category || 'bridals'

    function isFirst6(category: string, price: PriceObject) {
        if (category === 'venues') {
            return price.monthly
        } else if (category === 'agents') {
            return price.monthly
        } else if (category === 'bridals') {
            return price.monthly
        } else if (category === 'photovideo') {
            return price.monthly
        } else if (category === 'catering') {
            return price.monthly
        } else if (category === 'decor') {
            return price.monthly
        } else if (category === 'henna') {
            return price.monthly5
        } else if (category === 'mua') {
            return price.monthly5
        } else if (category === 'emcees') {
            return price.monthly5
        } else if (category === 'honeymoon') {
            return price.monthly5
        } else if (category === 'misc') {
            return price.monthly5
        }       
    }

    function handleValidUpgrade(category: string) {
        if (category === 'venues') {
            return 'prod_PISZQFLWCfyPBj'
        } else if (category === 'agents') {
            return 'prod_PISZQFLWCfyPBj'
        } else if (category === 'bridals') {
            return 'prod_PISZQFLWCfyPBj'
        } else if (category === 'photovideo') {
            return 'prod_PISZQFLWCfyPBj'
        } else if (category === 'catering') {
            return 'prod_PISZQFLWCfyPBj'
        } else if (category === 'decor') {
            return 'prod_PISZQFLWCfyPBj'
        } else if (category === 'henna') {
            return 'prod_PKI6iJA0CtxBZT'
        } else if (category === 'mua') {
            return 'prod_PKI6iJA0CtxBZT'
        } else if (category === 'emcees') {
            return 'prod_PKI6iJA0CtxBZT'
        } else if (category === 'honeymoon') {
            return 'prod_PKI6iJA0CtxBZT'
        } else if (category === 'misc') {
            return 'prod_PKI6iJA0CtxBZT'
        } else {
            return 'prod_PISZQFLWCfyPBj'
        }
    }
    
  return (
    <main className="mx-4 my-12">
        <div className="text-center">
            <h1 className="mb-4 text-2xl font-normal md:text-3xl lg:text-4xl">
                <span className="font-semibold">Sarang Sayang Vendor Plans</span>
            </h1>
            <p className="text-sm font-normal text-gray-400">
                See below our main two plans for your business.
            </p>
            <p className="text-sm font-normal text-gray-400">
                It start from here! Add ons are only available for Supervendors.
            </p>
            <Button variant='ghost' className="mt-3">
                <Link href={portal} className="flex gap-2 items-center">
                    Manage Billing <MoveRight className='ml-1 h-4 w-4 transition-all text-muted-foreground'/>
                </Link>
            </Button>
        </div>

        <Tabs defaultValue="plans" className="w-full flex flex-col items-center mt-10">
            <TabsList className="grid w-[400px] grid-cols-2 mb-6">
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="addon">Add On</TabsTrigger>
            </TabsList>

            <TabsContent value="plans">
                <div className="flex flex-col items-center justify-center mt-5 px-20 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-6">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {userRole === 'vendor' ? <Crown className="text-yellow-600"/> : null}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>You are here!</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                            {/* Price */}
                            <div className="flex-shrink-0">
                                <span className="text-4xl font-medium tracking-tight">Free</span>
                                <span className="text-gray-400">/forever</span>
                            </div>

                            {/* Name and DESC */}
                            <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
                                <div className="flex items-center gap-1">
                                    <h2 className="text-2xl font-normal">Offical Vendor</h2>
                                    <BadgeCheck aria-hidden='true' className='h-4 w-4 flex-shrink-0 text-blue-400'/>
                                </div>
                                <p className="text-sm text-gray-400">
                                    All vendors that have claimed their vendor profile are automatically an Official Vendor.
                                </p>
                            </div>

                            <ul className="flex-1 space-y-4">
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <span className="ml-3 text-base font-medium">Access to dashboard</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Access to statistics</p>
                                        <p className="ml-3 text-sm italic font-light">Page visits, Enquiries, Vendor likes</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Access to update</p>
                                        <p className="ml-3 text-sm italic font-light">Vendor Profile / Packages</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Access to personal</p>
                                        <p className="ml-3 text-base font-medium">CRM Platform</p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="h-6">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {userRole != 'vendor' ? <Crown className="text-yellow-600"/> : null}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>You are here!</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                            {/* Price */}
                            <div className="flex-shrink-0">
                                <span className="text-4xl font-medium tracking-tight">$</span>
                                {!annually ? <>
                                    <span className="text-4xl font-medium tracking-tight">{isFirst6(category, {
                                        monthly: 500,
                                        monthly5: 200
                                    })}</span>
                                    <span className="text-gray-400">/month</span>
                                </> : <>
                                    {/* @ts-ignore */}
                                    <span className="text-4xl font-medium tracking-tight">{isFirst6(category, {
                                        monthly: 500,
                                        monthly5: 200
                                    }) * 12 * 0.8}</span>
                                    <span className="text-gray-400">/year</span>
                                </>}

                                
                            </div>

                            

                            {/* Name and DESC */}
                            <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
                                <div className="flex items-center gap-1">
                                    <h2 className="text-2xl font-normal">Supervendor</h2>
                                    <BadgeCheck aria-hidden='true' className='h-4 w-4 flex-shrink-0 text-yellow-400'/>
                                </div>
                                <p className="text-sm text-gray-400">
                                    All the basics for businesses that are just getting started.
                                </p>
                            </div>

                            <ul className="flex-1 space-y-4 mb-8">
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <span className="ml-3 text-base font-medium">Access to dashboard</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Access to statistics:</p>
                                        <p className="ml-3 text-sm italic font-light">Page visits, Enquiries, Vendor likes</p>
                                    </div>
                                    
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Access to update:</p>
                                        <p className="ml-3 text-sm italic font-light">Vendor Profile / Packages</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Access to personal</p>
                                        <p className="ml-3 text-base font-medium">CRM Platform</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Able to view all</p>
                                        <p className="ml-3 text-base font-medium">Sarang Sayang enquiries</p>
                                    </div>
                                </li>
                            </ul>

                            {/* Plan switch */}
                            <div>
                                <div className="flex items-center justify-center mt-18 space-x-4 border-t p-5">
                                    <p className="font-medium text-sm">Bill Monthly</p>
                                    <Switch checked={annually} onCheckedChange={setAnnually}/>
                                    <p className="text-sm font-medium flex flex-col">Bill Annually <span className="font-light">(20% off)</span></p>
                                </div>
                                {annually ? <p className="text-sm font-light text-center text-gray-400 mt-3">All yearly plans are non-refundable.</p> : <p className="text-sm font-light text-center text-gray-400 mt-3">Monthly plans can be cancelled at any time.</p> }
                            </div>
                            
                            <Button
                                disabled={hasSub}
                                className='w-full'
                            >
                                <Link href={checkoutLink}>Upgrade Now</Link>
                            </Button>
                        </section>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="addon">
                <div className="flex flex-col items-center justify-center mt-5 px-20 lg:flex-row lg:items-stretch lg:space-x-8 lg:space-y-0">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-6"></div>
                        <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                            {/* Price */}
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-4xl font-medium tracking-tight">$300</span>
                            </div>

                            {/* Name and DESC */}
                            <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
                                <div className="flex items-center gap-1">
                                    <h2 className="text-2xl font-normal">Platinum Tier</h2>
                                </div>
                                <p className="text-sm text-gray-400">
                                    All the basics for businesses that are just getting started.
                                </p>
                            </div>

                            <ul className="flex-1 space-y-4">
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Top 4 Listings</p>
                                        <p className="ml-3 text-sm italic font-light">In respective category</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Consolidated Social Media Post</p>
                                        <p className="ml-3 text-sm italic font-light">(eg: Bridals to look out for)</p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="h-6"></div>
                        <section className="flex flex-col w-full max-w-sm p-12 space-y-6 bg-white rounded-lg shadow-md">
                            {/* Price */}
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <span className="text-2xl text-gray-400">+</span>
                                <span className="text-4xl font-medium tracking-tight">$500</span>
                            </div>

                            {/* Name and DESC */}
                            <div className="flex-shrink-0 pb-6 space-y-2 border-b h-[120px]">
                                <div className="flex items-center gap-1">
                                    <h2 className="text-2xl font-normal">Elite Tier</h2>
                                </div>
                                <p className="text-sm text-gray-400">
                                    All the basics for businesses that are just getting started.
                                </p>
                            </div>

                            <ul className="flex-1 space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Top Listing</p>
                                        <p className="ml-3 text-sm italic font-light">In respective category</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Consolidated Social Media Post</p>
                                        <p className="ml-3 text-sm italic font-light">(eg: Bridals to look out for)</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Featured on</p>
                                        <p className="ml-3 text-base font-medium">Sarang Sayang Homepage</p>
                                    </div>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-500"/>
                                    <div>
                                        <p className="ml-3 text-base font-medium">Featured Category Photo</p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    </main>
  )
}

export default PriceRange