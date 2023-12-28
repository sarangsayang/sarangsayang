import { BadgeCheck, Heart } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const BadgeLegend = () => {
  return (
    <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
        
        <div className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
            <div className='md:flex-shrink-0 flex justify-center'>
                <div className='p-6 h-30 w-60 flex flex-col gap-2 items-start justify-center rounded-lg bg-white shadow-md'>
                    <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                        Sarang Sayang
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Category
                    </p>
                    <Heart aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-gray-400' />
                </div>
            </div>
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                <h3 className='text-base font-medium text-gray-900'>
                    Non-Offical Vendor
                </h3>
                <p className='mt-3 text-sm text-muted-foreground'>
                    Desc
                </p>
            </div>
        </div>

        <div className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
            <div className='md:flex-shrink-0 flex justify-center'>
                <div className='p-6 h-30 w-60 flex flex-col gap-2 items-start justify-center rounded-lg bg-white shadow-md'>
                    <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                        Sarang Sayang
                        <span><BadgeCheck aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-blue-400'/></span>
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Category
                    </p>
                    <Heart aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-gray-400' />
                </div>
            </div>
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                <h3 className='text-base font-medium text-gray-900'>
                    Official Vendor
                </h3>
                <p className='mt-3 text-sm text-muted-foreground'>
                    Desc
                </p>
            </div>
        </div>

        <div className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
            <div className='md:flex-shrink-0 flex justify-center'>
                <div className='p-6 h-30 w-60 flex flex-col gap-2 items-start justify-center rounded-lg bg-white shadow-md'>
                    <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                        Sarang Sayang
                        <span><BadgeCheck aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-yellow-400'/></span>
                    </h3>
                    <p className='text-sm text-gray-500'>
                        Category
                    </p>
                    <Heart aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-gray-400' />
                </div>
            </div>
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                <h3 className='text-base font-medium text-gray-900'>
                    Supervendor
                </h3>
                <p className='mt-3 text-sm text-muted-foreground'>
                    Desc
                </p>
            </div>
        </div>
    </div>
  )
}

export default BadgeLegend