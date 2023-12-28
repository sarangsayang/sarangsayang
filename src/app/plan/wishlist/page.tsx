import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import CategorizedLikes from '@/components/plan/CategorizedLikes'
import { getServerSideUser } from '@/lib/payload-utils'
import { Loader } from 'lucide-react'
import { cookies } from 'next/headers'

export default async function Wishlist() {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

  return (
      <MaxWidthWrapper className="flex-1 space-y-4 pt-6 py-20 ">
          <div className="flex items-center justify-between space-y-2 pb-8">
              <div>
                  <h2 className="text-3xl font-bold tracking-tight">Wishlist</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s an overview of vendors you&apos;ve liked!
                  </p>
              </div>
          </div>
          {user ? <CategorizedLikes userId={user.id} /> : <Loader />}
      </MaxWidthWrapper>
  )
}