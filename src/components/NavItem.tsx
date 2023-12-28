'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Button } from './ui/button'
import { ChevronDown, LockKeyhole } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

import {motion} from 'framer-motion'
import { toast } from 'sonner'

type Category = (typeof PRODUCT_CATEGORIES)[number]

interface NavItemProps {
  category: Category
  handleOpen: () => void
  close: () => void
  isOpen: boolean
  isAnyOpen: boolean
  leftconstraint?: number
  locked: boolean
  signedIn: boolean
}

function lockingSystem(locked: boolean, signedIn: boolean, isOpen: boolean) {
  if (!locked) {
    return <ChevronDown
              className={cn(
                'h-4 w-4 transition-all text-muted-foreground',
                {
                  '-rotate-180': isOpen,
                }
              )}
            />
  } else if (locked) {
    return <LockKeyhole className='h-4 w-4 transition-all text-muted-foreground'/>
}
}
  //   }} className='h-4 w-4 transition-all text-muted-foreground'/>
  // } else if (locked && signedIn) {
  //   return <ChevronDown
  //     className={cn(
  //       'h-4 w-4 transition-all text-muted-foreground',
  //       {
  //         '-rotate-180': isOpen,
  //       }
  //     )}
  //   />

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
  leftconstraint,
  locked,
  signedIn,
}: NavItemProps) => {
  return (
    <div className='flex'>
      <div className='relative flex items-center'>
        <Button
          className='gap-1.5'
          onClick={handleOpen}
          variant={isOpen ? 'secondary' : 'ghost'}>
          {category.label}
          {lockingSystem(locked, signedIn, isOpen)}
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            {
              'animate-in fade-in-10 slide-in-from-top-5':
                !isAnyOpen,
            }
          )}>
          <div
            className='absolute inset-0 top-1/2 bg-white shadow'
            aria-hidden='true'
          />

          <div className='relative bg-white'>
            <div className='w-full px-8'>
              <motion.div className='cursor-grab overflow-scroll h-[45vh] flex flex-row' whileTap={{cursor: "grabbing"}}>
                <motion.div drag="x" dragConstraints={{right:0, left:leftconstraint}} className='flex'>
                  {category.featured.map((item) => (
                    <motion.div
                      key={item.name}
                      className='min-w-[15rem] p-[40px] group '>
                      <div className='relative rounded-2xl bg-gray-100 group-hover:opacity-75 h-[250px]'>
                        <Link href={item.href} onClick={() => close()}>
                        <Image
                          fill
                          src={item.imageSrc}
                          alt='product category image'
                          className='object-cover object-center h-full w-full rounded-2xl'
                        />
                        </Link>
                      </div>

                      <div
                        className='mt-6 block font-medium text-gray-900'>
                        {item.name}
                      </div>
                      <p
                        className='mt-1 font-extralight'
                        aria-hidden='true'>
                          <a href={item.href} className='hover:underline'>Browse</a>
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NavItem
