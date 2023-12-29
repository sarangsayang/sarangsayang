import { VENDOR_CATEGORIES } from '@/config'
import { Vendor } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { ImageIcon, Loader, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface LikeItemProps {
  vendorId: string
  likeId: string
} 

const LikeItem = ({ vendorId, likeId }: LikeItemProps) => {

  const vendor = trpc.getVendor.useQuery({
    id: vendorId
  })

  const removeLike = trpc.removeLike.useMutation()
  
  if (vendor.status === 'loading') {
    return <Loader />
  } else if (vendor.status === 'success') {
    const validVendor = vendor.data.docs[0] as Vendor

    const label = VENDOR_CATEGORIES.find(
      ({ value }) => value === validVendor.category
    )?.label

    return (
      <div className='space-y-3 py-2'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-center space-x-4'>
          <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
            {typeof validVendor.images[0].image !== 'string' && validVendor.images[0].image.url ? (
              <Image
                src={validVendor.images[0].image.url}
                alt={validVendor.name}
                fill
                className='absolute object-cover'
              />
            ) : (
              <div className='flex h-full items-center justify-center bg-secondary'>
                <ImageIcon
                  aria-hidden='true'
                  className='h-4 w-4 text-muted-foreground'
                />
              </div>
            )}
          </div>
            <div className='flex flex-col self-start'>
              <Link href={`/vendor/${validVendor.id}`}>
                <span className='line-clamp-1 text-sm font-medium mb-1'>
                  {validVendor.name}
                </span>
              </Link>

              <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
                {label}
              </span>

            </div>
          </div>
          <div className='text-xs text-muted-foreground'>
            <button
              onClick={() => removeLike.mutate({ likeId: likeId })}
              className='flex items-center gap-0.5'>
              <X className='w-3 h-4' />
              Remove
            </button>
          </div>
          
        </div>
      </div>
    )
  }
}

export default LikeItem
