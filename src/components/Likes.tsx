'use client'

import { BookHeart } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from './ui/sheet'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import LikeItem from './LikeItem'
import { trpc } from '@/trpc/client'
import { User } from '@/payload-types'

const Likes = ({ user }: { user: User }) => {

    const getLikes = trpc.getLikes.useQuery({
        userId: user.id
    }).data || []
    const itemCount = getLikes.length  

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
      }, [])

    return (
        <Sheet>
            <SheetTrigger className='group -m-2 flex items-center p-2'>
                <BookHeart
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-blue-400 group-hover:text-blue-500'
                />
                <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                {isMounted ? itemCount : 0}
                </span>
            </SheetTrigger>
            <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
                <SheetHeader className='space-y-2.5 pr-6'>
                    <SheetTitle>Wishlist ({itemCount})</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className='flex w-full flex-col pr-6'>
                            <ScrollArea>
                                {getLikes.map(( like ) => (<LikeItem key={like.id} vendorId={like.vendorId} likeId={like.id}/>))}
                            </ScrollArea>
                        </div>
                    </>
                ) : (
                    <div className='flex h-full flex-col items-center justify-center space-y-1'>
                        <div
                        aria-hidden='true'
                        className='relative mb-4 h-60 w-60 text-muted-foreground'>
                            <Image
                                src='/hippo-empty-cart.png'
                                fill
                                alt='empty shopping cart hippo'
                            />
                        </div>
                        <div className='text-xl font-semibold'>
                        Your heart is empty..
                        </div>
                        <SheetTrigger asChild>
                            <Link
                                href='/vendors'
                                className={buttonVariants({
                                variant: 'link',
                                size: 'sm',
                                className:
                                'text-sm text-muted-foreground',
                            })}>
                                Add items to your likes!
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default Likes