'use client'

import Image from "next/image"
import { 
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "./ui/carousel"

import Autoplay from "embla-carousel-autoplay"

const HomepageAds = () => {
  return (
    <section className='pt-12'>
        <Carousel 
            // plugins={[
            //     Autoplay({
            //         delay: 5000,
            //     }),
            // ]}
        >
            <CarouselContent>
                <CarouselItem className="flex items-center justify-center p-6">
                    <Image src="https://placehold.co/1000x200" alt="ad1"/>
                </CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>
    </section>
  )
}

export default HomepageAds