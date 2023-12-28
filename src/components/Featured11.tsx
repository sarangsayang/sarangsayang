'use client'

import { 
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "./ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"

const Featured11 = () => {
  return (
    <section className='pt-12'>
        <div className='md:flex md:items-center md:justify-between mb-4'>
            <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
                <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
                    Featured Vendors
                </h1>
            </div>
        </div>

        <Carousel 
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Venue
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Agent
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Bridal
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Photo & Video
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Catering
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Decor
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Henna
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Make Up Artist
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Emcee
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Honeymoon
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem className="flex items-center justify-center p-6">
                    <div>
                        <Image src="https://placehold.co/800x300" alt='SarangSayang'/>
                        <div className='mt-3 h-30 w-60 flex flex-col gap-2 items-start justify-center bg-white'>
                            <h3 className='flex items-center gap-1 font-medium text-sm text-gray-700'>
                                SarangSayang
                            </h3>
                            <p className='text-sm text-gray-500'>
                                Misc
                            </p>
                        </div>
                    </div>
                </CarouselItem>

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </section>
  )
}

export default Featured11