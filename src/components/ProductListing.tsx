'use client'

import { Vendor } from '../payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { VENDOR_CATEGORIES } from '../config'
import ImageSlider from './ImageSlider'
import LikeButton from './LikeButton'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import Badge from './Badge'


interface ProductListingProps {
  vendor: Vendor | null
  index: number
  user?: string
}

const ProductListing = ({
  vendor,
  index,
  user,
}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!vendor || !isVisible) return <ProductPlaceholder />

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === vendor.category
  )?.label

  const validUrls = vendor.images ? vendor.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[] : []

  if (isVisible && vendor) {
    return (
      <div
        className={cn(
          'invisible h-full w-full group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        >
        <div className='flex flex-col w-full'>
          {user ? 
            <Link href={`/vendor/${vendor.id}`} className='cursor-pointer'>
              <ImageSlider urls={validUrls} />
              <h3 className='flex items-center gap-2 mt-4 font-medium text-sm text-gray-700'>
                {vendor.name}
                {/* @ts-ignore */}
                <span><Badge vendUserId={vendor.venduserid.id}/></span>
              </h3>
            </Link>
           : 
            <Link href='#' onClick={() => {
              toast.error(
                'You have to be logged in first.'
              )
            }}>
            <ImageSlider urls={validUrls} />
            <h3 className='flex items-center gap-2 mt-4 font-medium text-sm text-gray-700'>
              {vendor.name}
              {/* @ts-ignore */}
              <span><Badge vendUserId={vendor.venduserid.id}/></span>
            </h3>
          </Link>
           }
          <Link href={`/vendors?category=${vendor.category}`}>
            <p className='mt-1 text-sm text-gray-500'>
              {label}
            </p>
          </Link>

        </div>
          <div className='mt-1'>
            {user ? <LikeButton vendor={vendor} user={user}/> : (
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
      </div>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default ProductListing
