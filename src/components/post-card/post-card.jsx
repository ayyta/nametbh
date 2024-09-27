"use client"

import React, { useState, useCallback, useEffect, forwardRef, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import { Heart, ThumbsDown, MessageCircle, Share2, X } from "lucide-react"
import Image from "next/image"

export default function Component({
  avatar = "/placeholder-avatar.jpg",
  name = "John Doe",
  username = "@johndoe",
  creationDate = "2h ago",
  content = "This is a sample post content. It can be much longer and will wrap to multiple lines if needed. ",
  images = ["/massageServices.jpg", "/haircut2.jpg", "/massageServices.jpg", "/haircut2.jpg"], 
  // "/haircut2.jpg", "/massageServices.jpg", "/Plus square.svg", "/Upload Icon.svg", "/Home Icon.svg", "/Generic avatar.svg"
}) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const handleLike = (isActive, count) => {
    console.log(`Like is now ${isActive ? "active": "inactive"} with count: ${count}`);
  }

  const handleShare = () => {
    console.log("Pressed share button");
  }

  const handleComment = () => {
    console.log("Pressed comment button");
  }
  const openCarousel = (index) => {
    setIsCarouselOpen(true)
  }

  const closeCarousel = () => {
    setIsCarouselOpen(false)
  }

  // optimize image loading by allowing optimization from s3 bucket in next.config.js remotePatterns
  return (
    <>
      <Card className="w-192 h-fit bg-transparent border-none text-white">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-sm text-gray-500">{username} • {creationDate}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{content}</p>
          {images.length > 0 && (
            <div className={`grid gap-0.5 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} rounded-2xl border overflow-hidden cursor-pointer active:scale-95 transition-all duration-150 ease-in-out`}>
              {images.map((src, index) => (
                <div 
                  className={`relative w-full flex justify-center`} 
                  key={index} 
                  onClick={() => {openCarousel(index);}}
                >
                  <Image
                    src={src}
                    quality={images.length > 1 ? 50 : 100}
                    alt={`Image ${index + 1}`}
                    layout="intrinsic" // Let the image control the container's size
                    width={images.length > 1 ? 400 : 700} // Example width based on media length
                    height={images.length > 1 ? 300 : 500} // Example height based on media length
                    className={`${images.length > 1 ? "object-cover max-h-52" : "object-contain"} max-h-161`}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <PostCardInteractionButton 
            initialCount={0}
            activeColor="#f91980"
            inactiveColor=""
            color="pink"
            callBack={handleLike} 
            Icon={Heart} 
          />
          <PostCardActionButton
            initialCount={2}
            color="blue"
            callBack={handleComment}
            Icon={MessageCircle}
          />
          <PostCardActionButton
            initialCount={5}
            color="green"
            callBack={handleShare}
            Icon={Share2}
          />
        </CardFooter>
      </Card>
      <PostCardCarousel 
        images={images} 
        isCarouselOpen={isCarouselOpen} 
        closeCarousel={closeCarousel}
      />
    </>

  )

}

const PostCardInteractionButton = forwardRef(function PostCardButton({
  initialCount = 0,
  activeColor = "red",
  inactiveColor = "gray",
  color = "white",
  callBack = () => {},
  Icon
}, ref) {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(initialCount);

  // Set the active state and count
  const handleClick = () => {
    setIsActive(!isActive);
    setCount(prevCount => isActive ? prevCount-1 : prevCount+1)
    if (callBack) {
      callBack(!isActive, count)
    }
  }
  const colorVariants = {
    "pink": {
      buttonBackgroundHover: `hover:bg-pink-600/10`,
      iconGroupHover: `group-hover:stroke-pink-500`,
      countColor: `text-pink-600`,
      countGroupHover: `group-hover:text-pink-600`,
    },
  }
  return (
    <Button 
      ref={ref} 
      className={`rounded-3xl ${colorVariants[color].buttonBackgroundHover} group hover:text-white w-16 active:scale-90 transition-all duration-150 ease-in-out`}
      variant="ghost" 
      size="sm"
      onClick={handleClick}
    >
      <Icon 
        fill={`${isActive ? activeColor: inactiveColor}`} 
        strokeWidth={`${isActive ? 0: 2}`} 
        className={`w-6 h-6 mr-2 group-hover:stroke-pink-500`}
        color="currentColor"

      />
      <span 
        className={`
          text-sm 
          ${isActive ? colorVariants[color].countColor : `text-white`} 
          ${colorVariants[color].countGroupHover} 
          transition-colors 
          duration-150`}
      >      
        {count}
      </span>
    </Button>
  )
})

const PostCardActionButton = forwardRef(function PostCardActionButton({
  color,
  initialCount=0,
  Icon,
  callBack=() => {},
}, ref) {
  const [count, setCount] = useState(initialCount);

  // const updateCount = async () => {
  //   try { 
  //     const newCount = await fetch("update count");
  //     setCount(newCount);
  //   } catch (error) {
  //     console.error("Error failed in fetching data", error);
  //   }
  // }

  // // Update the count every 3 seconds
  // useEffect(() => {
  //   setInterval(updateCount(), 3000);
  //   return () => clearInterval(intervalId); // Clean up on unmount
  // }, [])

  const colorVariants = {
    "blue": {
      buttonBackgroundHover: `hover:bg-blue-500/10`,
      iconGroupHover: `group-hover:stroke-blue-400`,
      countColor: `text-blue-500`,
      countGroupHover: `group-hover:text-blue-500`,
    },
    "green": {
      buttonBackgroundHover: `hover:bg-green-600/10`,
      iconGroupHover: `group-hover:stroke-green-500`,
      countColor: `text-green-600`,
      countGroupHover: `group-hover:text-green-600`,
    },
  }

  const handleClick = () => {
    if (callBack) {
      callBack()
    }
  }

  // const updateCount = async () => {
  //   try { 
  //     const newCount = await fetch("update count");
  //     setCount(newCount);
  //   } catch (error) {
  //     console.error("Error failed in fetching data", error);
  //   }
  // }

  // // Update the count every 3 seconds
  // useEffect(() => {
  //   setInterval(updateCount(), 3000);
  //   return () => clearInterval(intervalId); // Clean up on unmount
  // }, [])

  return (
    <Button
      ref={ref}
      className={`
        rounded-3xl 
        ${colorVariants[color].buttonBackgroundHover} 
        hover:text-white 
        group 
        w-fit 
        active:scale-90 
        transition-all 
        duration-150 
        ease-in-out
      `}
      variant="ghost" 
      size="sm"
      onClick={handleClick}
    >
      <Icon 
        className={`
          w-6 
          h-6 
          mr-2  
          ${colorVariants[color].iconGroupHover}
        `}
        color="currentColor"
      />
      <span className={`
        text-sm 
        text-white 
        ${colorVariants[color].countGroupHover} 
      `}>{count}</span>
    </Button>
  )

})


const PostCardCarousel = forwardRef(function PostCardCarousel({
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
            <CarouselPrevious className="absolute top-1/2 left-8 transform -translate-y-1/2 -translate-x-1/2 z-10" />
            <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 z-10" />
          </Carousel>
        </div>
      )}

    </>

  )
  
})