"use client"

import React, { useState, forwardRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, ThumbsDown, MessageCircle, Share2 } from "lucide-react"

export default function Component({
  avatar = "/placeholder-avatar.jpg",
  name = "John Doe",
  username = "@johndoe",
  creationDate = "2h ago",
  content = "This is a sample post content. It can be much longer and will wrap to multiple lines if needed.",
  media = ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"]
}) {

  const handleLike = (isActive, count) => {
    console.log(`Like is now ${isActive ? "active": "inactive"} with count: ${count}`);
  }

  const handleDislike = (isActive, count) => {
    console.log(`Dislikes is now ${isActive ? "active": "inactive"} with count: ${count}`);
  }

  const handleShare = () => {
    console.log("Pressed share button");
  }

  const handleComment = () => {
    console.log("Pressed comment button");
  }

  return (
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
          {media.length > 0 && (
            <div className={`grid gap-2 ${media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {media.slice(0, 4).map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Media ${index + 1}`}
                  className="rounded-lg object-cover w-full h-48"
                />
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">

          <PostCardInteractionButton 
            initialCount={0}
            activeColor="#f91980"
            inactiveColor=""
            color="pink-600"
            callBack={handleLike} 
            Icon={Heart} 
          />

          <Button variant="ghost" size="default">
            <MessageCircle className="w-4 h-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="default">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </CardFooter>
    </Card>

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

  const handleClick = () => {
    setIsActive(!isActive);
    setCount(prevCount => isActive ? prevCount-1 : prevCount+1)
    if (callBack) {
      callBack(!isActive, setCount)
    }
  }
  return (
    <Button 
      ref={ref} 
      className={`rounded-3xl ${isActive ? `hover:bg-${color}/10`: "hover:bg-gray-600/10"} hover:text-white w-16 active:scale-90 transition-transform duration-150 ease-in-out`}
      variant="ghost" 
      size="sm"
      onClick={handleClick}
    >
      <Icon 
        fill={`${isActive ? activeColor: inactiveColor}`} 
        strokeWidth={`${isActive ? 0: 2}`} 
        className="w-6 h-6 mr-2 "
      />
      <span className={`text-sm  ${isActive ? `text-${color}` : "text-white"}`}>{count}</span>
    </Button>
  )
})

const PostCardActionButton = forwardRef(function PostCardActionButton({
  label,
  Icon,
  color,
  callBack=() => {},
}, ref) {
  return (
    <Button
      ref={ref}
      className={`rounded-3xl hover:bg-gray-600/10 hover:text-white w-16 active:scale-90 transition-transform duration-150 ease-in-out`}
      variant="ghost" 
      size="sm"
      onClick={callBack}
    >
      <Icon 
        fill={`${isActive ? activeColor: inactiveColor}`} 
        strokeWidth={`${isActive ? 0: 2}`} 
        className="w-6 h-6 mr-2 "
      />
      <span className={`text-sm  ${isActive ? `text-${color}` : "text-white"}`}>{count}</span>

    </Button>
  )

})