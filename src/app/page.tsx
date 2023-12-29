import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
  LockKeyhole,
} from 'lucide-react'
import Link from 'next/link'

import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import HomepageAds from '@/components/HomepageAds'
import BadgeLegend from '@/components/BadgeLegend'
import Featured11 from '@/components/Featured11'

const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

export default async function Home() {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  return (
    <>
      <MaxWidthWrapper>
        <div className='pt-16 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Singapore&apos;s largest{' '}
            <span className='text-blue-400'>
              malay wedding directory
            </span>
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to Sarang Sayang, a platform for all things malay weddings.
          </p>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            {user?.id}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-10'>
            <Link
              href='/vendors'
              className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant='ghost'>
              Start Planning <LockKeyhole className='ml-1 h-4 w-4 transition-all text-muted-foreground'/>
            </Button>
          </div>
        </div>
        <Featured11 />
        <HomepageAds />
        <ProductReel user={user?.id} title='Brand New' query={{sort: 'desc', limit: 4}}/>
      </MaxWidthWrapper>

      <section className='border-t border-gray-200 bg-gray-50'>
        <MaxWidthWrapper className='py-20'>
          <BadgeLegend />
        </MaxWidthWrapper>
      </section>
    </>
  )
}
