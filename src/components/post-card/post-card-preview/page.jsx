
"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import PostCardPreviewHeader from "@/components/post-card/post-card-preview/header"
import PostCardPreviewFooter from "@/components/post-card/post-card-preview/footer"
import PostCardCarousel from "@/components/post-card/post-card-carousel"
import ReplyPopup from "@/components/post-card/reply";
import { set } from "react-hook-form"

export default function Component({
  postId=null,
  userId=null,
  pfp = "/placeholder-avatar.jpg",
  name = "John Doe",
  username = "johndoe",
  creationDate = "2h ago",
  content = "This is a sample post content. It can be much longer and will wrap to multiple lines if needed. ",
  imagesProp = [],
  likeCount = 0,
  commentCount = 0,
  shareCount = 0,
  hasReplies=false,
  hasButtons=true,
  isCurrentPost=false,
}) {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [images, setImages] = useState(imagesProp);
  const [user, setUser] = useState({
    pfp: pfp, 
    name: name, 
    username: username, 
    bio: "some bio", 
    following_count: 0, 
    follower_count: 0, 
    followsYou: false, 
    following: false, 
    friends: false
   });

  const router = useRouter();

  const openCarousel = () => setIsCarouselOpen(true);
  const closeCarousel = () => setIsCarouselOpen(false);
  const openReply = () => setIsReplyOpen(true);

  useEffect(() => {
    // fetch user data
    setUser({
      pfp: pfp, 
      name: name, 
      username: username, 
      bio: "some bio", 
      following_count: 0, 
      follower_count: 0, 
      followsYou: false, 
      following: false, 
      friends: false
    });
    // fetch media data if any
  }, [])
  const renderImages = () => (
    images.length > 0 && (
      <div className={`grid gap-0.5 ${images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} rounded-2xl border border-white/30 overflow-hidden cursor-pointer active:scale-95 transition-all duration-150 ease-in-out w-fit`}>
        {images.map((src, index) => (
          <div 
            className={`relative w-fit flex`} 
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
    )
  )

  const handleRedirect = () => {
    if (isCurrentPost) return;
    router.replace(`/${username}/post/${postId}`);
  }
  // optimize image loading by allowing optimization from s3 bucket in next.config.js remotePatterns
  return (
    <>
      <Card 
        className={`w-192 h-fit bg-transparent border-none text-white ${!isCurrentPost ? "hover:cursor-pointer": ""}`} 
        onClick={handleRedirect}
      >
        <PostCardPreviewHeader
          pfp={pfp}
          name={name}
          username={username}
          creationDate={creationDate}
        />
        <div className="flex">
          {hasReplies && (
            <Separator orientation="vertical" className="h-auto ml-11 bg-white/40" />
          )}

          <div className="">
            <CardContent className="space-y-4">
              <p>{content}</p>
              {renderImages()}
            </CardContent>
            <PostCardPreviewFooter
              hasButtons={hasButtons}
              likeCount={likeCount}
              commentCount={commentCount}
              shareCount={shareCount}
              postId={postId}
              userId={userId}
              openReply={openReply}
            />
          </div>
        </div>
      </Card>
      <PostCardCarousel 
        images={images} 
        isCarouselOpen={isCarouselOpen} 
        closeCarousel={closeCarousel}
      />
      <ReplyPopup isOpen={isReplyOpen} setIsOpen={setIsReplyOpen} />
    </>

  )

}



