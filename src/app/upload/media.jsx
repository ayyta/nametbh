'use client'

import Image from 'next/image'
import { useEffect } from 'react';
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Media({ images=[], setMedia, gifs, setGifs }) {

  /**
   * If we only have one image then we want to return the max size the image can be rendered on the screen, else we want to return a carousel of our images.
   */
  if (images.length === 1) {
    return images.map((mediaFile) => {
      const isImage = mediaFile.type.startsWith("image/");
      const isVideo = mediaFile.type.startsWith("video/");    

      return (
        <div className='relative m-2 w-full'>
          {isImage && (
            <>
              <Image 
                src={mediaFile.url}
                width={0}
                height={0}
                sizes='100vw'
                style={{ "width" : "100%" }}
                alt='Media'
                className='rounded-lg'
              />
              <button 
                className='absolute top-1.5 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer'
                onClick={() => 
                  setMedia(images.filter((e) => e!== mediaFile))
                }
              >
                <Image
                  src="/Close Small Icon.svg"
                  width={32}
                  height={0}
                  alt='Close logo'
                />
              </button>
            </>
          )}

          {isVideo && (
            <>
              <video width="100%" className='rounded-lg' controls muted>
                <source src={mediaFile.url} type={mediaFile.type} />
                Your browser does not support the video tag.
              </video>
              <button 
                className='absolute top-1.5 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer'
                onClick={() => 
                  setMedia(images.filter((e) => e!== mediaFile))
                }
              >
                <Image
                  src="/Close Small Icon.svg"
                  width={32}
                  height={0}
                  alt='Close logo'
                />
              </button>
            </>
          )}
        </div>
      )
    })
  } else if (images.length > 1) {
    return (
      <Carousel className="relative w-full m-2">
        <CarouselContent className="m-0">
          {images.map((mediaFile, index) => {
            const isImage = mediaFile.type.startsWith("image/");
            const isVideo = mediaFile.type.startsWith("video/");
            // console.log(mediaFile);

            return (
              <CarouselItem 
                key={index} 
                className="relative pl-0"
                style={{ 
                  "aspect-ratio" : `${mediaFile.type.startsWith("image/") ? "1/1" : "16/9"}`,
                  "flex-basis" : `${mediaFile.type.startsWith("image/") ? "50%" : "100%"}` 
                }}
              >
                {isImage && (
                  <>
                    <Image 
                      src={mediaFile.url}
                      alt='Media'
                      fill
                      className='rounded-lg object-cover'
                    />
                    <button 
                      className='absolute top-1.5 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer'
                      onClick={() => 
                        setMedia(images.filter((e) => e!== mediaFile))
                      }
                    >
                      <Image
                        src="/Close Small Icon.svg"
                        width={32}
                        height={0}
                        alt='Close logo'
                      />
                    </button>
                  </>
                )}

                {isVideo && (
                  <>
                    <video width="100%" className='rounded-lg object-cover' controls muted>
                      <source src={mediaFile.url} type={mediaFile.type} />
                      Your browser does not support the video tag.
                    </video>
                    <button 
                      className='absolute top-1.5 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer'
                      onClick={() => 
                        setMedia(images.filter((e) => e!== mediaFile))
                      }
                    >
                      <Image
                        src="/Close Small Icon.svg"
                        width={32}
                        height={0}
                        alt='Close logo'
                      />
                    </button>
                  </>
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-black/50 hover:opactiy-80 hover:bg-primary active:opacity-50 cursor-pointer" />
        <CarouselNext className="right-2 bg-black/50 hover:opactiy-80 hover:bg-primary active:opacity-50 cursor-pointer" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
          {images.length} / {4}
       </div>
      </Carousel>
    )
  }


  useEffect(() => {
    const fetchData = async () => {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key : '7VGHs9vybY2b6EcUZtVi3ay9pVVlFOxu',
        }
      });
      console.log(results);
      setGifs(results.data.data);
    }
    fetchData();
  }, []);

  const renderGifs = () => {
    return gifs.map(giphy => {
      return (
        <div className="" key={giphy.id}>
          <Image 
            src={giphy.images.fixed_height.url}
            width={0}
            height={0}
            sizes='100vw'
            style={{ "width" : "100%" }}
            alt='Gif'
            className='rounded-lg'
          />
        </div>
      )
    });
  }

  // return (
  //   <>
  //     {renderGifs()}
  //   </>
  // );

}