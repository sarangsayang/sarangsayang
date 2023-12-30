import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { VENDOR_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BadgeCheck, Heart, Loader, MailQuestion, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button'

import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import LikeButton from '@/components/LikeButton'
import { toast } from 'sonner'
import { trpc } from '@/trpc/client'
import Badge from '@/components/Badge'
import { promise } from 'zod'
import EnquireButton from '@/components/EnquireButton'

interface PageProps {
  params: {
    vendorId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const nextCookies = cookies()
  const { user } = await getServerSideUser(nextCookies)

  const { vendorId } = params

  const payload = await getPayloadClient()

  const { docs: vendors } = await payload.find({
    collection: 'vendors',
    limit: 1,
    where: {
      id: {
        equals: vendorId,
      },
    },
  })

  const [product] = vendors

  if (!product) return notFound()

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  // @ts-ignore
  const smallCapsLabel = label.toLowerCase()

  const value = VENDOR_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.value

  const BREADCRUMBS = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Vendors', href: '/vendors' },
    { id: 3, name: label , href: `/vendors?category=${value}` },
  ]

  const validUrls = product.images
    // @ts-ignore
    .map(({ image }) =>
      image.url
    ) as string[]

  const packageList = product.packages

  function capitalizeFirstLetter(inputString: string) {
    // Check if the inputString is not empty
    if (inputString.length > 0) {
      // Capitalize the first letter and concatenate the rest of the string
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    } else {
      // Return an empty string if the input is empty
      return "";
    }
  }

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white grid grid-cols-1 md:grid-cols-2 py-10'>
        <div className='align-self-center'>
          <div className='aspect-square rounded-lg'>
            <ImageSlider urls={validUrls} />
          </div>
        </div>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='hidden md:flex items-center space-x-2 pb-10'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm gap-2'>
                    <Link
                      href={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className=''>
                <div className='mt-4'>
                  <h1 className='flex items-baseline gap-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    {product.name}
                    <span><Badge vendUserId={product.venduserid.id}/></span>
                  </h1>
                  <p className='text-muted-foreground mt-3 flex gap-2 items-center'>
                    <MapPin className='h-4 w-4'/>
                    {product.location}
                  </p>
                </div>

                <section className='mt-4'>
                  <div className='flex items-center'>
                      {user ? <LikeButton vendor={product} user={user.id}/> : (
                        <Heart
                        aria-hidden='true'
                        className='h-6 w-6 flex-shrink-0 text-gray-400 cursor-pointer'
                        onClick={() => {
                          toast.error(
                            'You have to be logged in first.'
                          )
                        }}
                        />
                      )}
                  </div>

                  <div className='mt-4 space-y-6'>
                    <p className='text-base text-muted-foreground'>
                      {product.details}
                    </p>
                  </div>

                  {/* Enquire */}
                  <div className='group inline-flex text-sm text-medium mt-10'>
                    {user ? <EnquireButton vendorId={product.id} userEmail={user.email}/> : null}
                  </div>
                </section>
            </div>
          </div>

        </div>
      </div>

      <div className=''>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[170px]">Packages</TableHead>
              <TableHead className="w-[100px]">Services</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* @ts-ignore */}
            {packageList > 0 ? 
              // @ts-ignore
              packageList.map((packageItem) => (
                <TableRow key={packageItem.name}>
                  <TableCell className='font-medium'>{packageItem.name}</TableCell>
                  <TableCell>
                    {packageItem.services.map((service: string) => (
                      <div key={service}>
                        <p>{capitalizeFirstLetter(service)}</p>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{packageItem.packageDetails}</TableCell>
                  <TableCell className="text-right">{formatPrice(packageItem.price)}</TableCell>
                </TableRow>
              )) : null
            }
            
          </TableBody>
        </Table>
      </div>

      <ProductReel
        href='/products'
        user={user?.id}
        idvPage={true}
        query={{ category: product.category, limit: 4 }}
        title={`Browse similar vendors`}
        subtitle={`Here are some ${smallCapsLabel.toLowerCase()} we think you might like`}
        vendorName={product.name}
      />
    </MaxWidthWrapper>
  )
}

export default Page
