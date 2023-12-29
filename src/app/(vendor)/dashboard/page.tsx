import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import CRMCont from "@/components/crm/CRMCont"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MousePointerClick } from "lucide-react"
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import TVLCont from "@/components/analytics/cards/vendorlikes/TVLCont"
import TECont from "@/components/analytics/cards/enquiries/TECont"
import SSCont from "@/components/analytics/cards/enquiries/SSCont"
import Graphs from "@/components/graphs/Graphs"


export default async function Dashboard() {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

  return (
    <MaxWidthWrapper className="flex-1 space-y-4 pt-6 py-20">
        <div className="flex items-center justify-between space-y-2 pb-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
                <p className="text-muted-foreground">
                Here&apos;s an overview of your vendor account and statistics.
                </p>
            </div>
        </div>
        <Tabs defaultValue="analytics" className="space-y-4">
            <TabsList>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="crm">
                    Customer Management
                </TabsTrigger>
            </TabsList>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Page Visits */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 h-20">
                            <CardTitle className="text-sm font-medium">
                                Total Page Visits
                            </CardTitle>
                            <MousePointerClick />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2000</div>
                            <p className="text-xs text-lime-700 mt-4">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    {/* Total Vendor Likes */}
                    <Card>
                        {user ? (
                            <TVLCont userId={user.id} />
                        ) : null }
                    </Card>

                    {/* Total Enquiries */}
                    <Card>
                        {user ? (
                            <TECont userId={user.id} />
                        ) : null }
                    </Card>

                    {/* Enquiries From Sarang Sayang */}
                    <Card>
                        {user ? (
                            <SSCont userId={user.id} />
                        ) : null }
                    </Card>
                </div>

                {user ? (
                    <Graphs userId={user.id} />
                ) : null }
                
            </TabsContent>

            {/* CRM */}
            <TabsContent value="crm" className="space-y-4">
                {user ? (
                    <CRMCont userId={user.id} role={user.role}/>
                ) : null
                }
            </TabsContent>
                
        </Tabs>
    </MaxWidthWrapper>
  )
}