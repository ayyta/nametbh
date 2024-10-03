import { forwardRef } from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const Component = forwardRef(function PostCardCarousel({
  images = [],
  isCarouselOpen = false,
  closeCarousel = () => {},
}, ref) {

  return (
    <>
      {isCarouselOpen &&  (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 hover:text-white rounded-full"
            onClick={closeCarousel}
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
          <Carousel 
            className="w-screen h-screen"
          >
              
            <CarouselContent className="">
              {images.map((image, index) => (
                <CarouselItem key={index} className="w-fit h-screen flex justify-center items-center relative">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    width={500}
                    height={300}
                    quality={100}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 ? <CarouselPrevious className="absolute top-1/2 left-8 transform -translate-y-1/2 -translate-x-1/2 z-10" /> : null}
            {images.length > 1 ? <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 z-10" /> : null}
          </Carousel>
        </div>
      )}

    </>

  )
  
})

export default Component;