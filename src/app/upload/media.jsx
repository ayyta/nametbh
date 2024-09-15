'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Media({ images=[], setMedia }) {
  // const [currentIndex, setCurrentIndex] = useState(0)

  /**
   * If we only have one image then we want to return the max size the image can be rendered on the screen, else we want to return a carousel of our images.
   */
  if (images.length === 1) {
    return images.map((mediaImage) => {
      return (
        <div className='relative m-2 w-full'>
          <Image 
            src={mediaImage}
            width={0}
            height={0}
            sizes='100vw'
            style={{"width" : "100%"}}
            alt='Media'
            className='rounded-lg'
          />
          <button 
            className='absolute top-1.5 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer'
            onClick={() => 
              setMedia(images.filter((e) => e!== mediaImage))
            }
          >
            <Image
              src="/Close Small Icon.svg"
              width={32}
              height={0}
              alt='Close logo'
            />
          </button>
        </div>
      )
    })
  } else if (images.length > 1) {
    return (
      <Carousel className="relative w-full m-2">
        <CarouselContent className="m-0">
          {images.map((mediaImage, index) => (
            <CarouselItem key={index} className="basis-1/2 relative aspect-square">
              <Image 
                src={mediaImage}
                alt='Media'
                fill
                className='rounded-lg object-cover'
              />
              <button 
                className='absolute top-1.5 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer'
                onClick={() => 
                  setMedia(images.filter((e) => e!== mediaImage))
                }
              >
                <Image
                  src="/Close Small Icon.svg"
                  width={32}
                  height={0}
                  alt='Close logo'
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-black/50 hover:opactiy-80 hover:bg-primary active:opacity-50 cursor-pointer" />
        <CarouselNext className="right-2 bg-black/50 hover:opactiy-80 hover:bg-primary active:opacity-50 cursor-pointer" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
          {images.length} / {4}
       </div>
      </Carousel>
    )
  }

}