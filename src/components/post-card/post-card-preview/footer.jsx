"use client"

import { useState, useEffect } from "react"

import { Heart, MessageCircle, Share2 } from "lucide-react"
import { PostCardActionButton, PostCardInteractionButton } from "@/components/post-card/post-card-buttons"
import { CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/hooks/use-toast"

const PostCardPreviewFooter = ({
  hasButtons=true,
  likeCount=0,
  commentCount=0,
  shareCount=0,
  postId=null,
  userId=null,
  openReply,
}) => {
  const [postLink, setPostLink] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // set postlink
    // fetch photos
    setPostLink("google.com")
  }, [])

  const handleLike = (isActive, count) => {
    console.log(`Like is now ${isActive ? "active": "inactive"} with count: ${count}`);
  }

  const handleShare = () => {
    console.log("Pressed share button");

    // Copy post link to clipboard, then show toast
    navigator.clipboard.writeText(postLink).then(()=> {
      toast({
        title: "Link Copied to Clipboard",
      })
    }).catch(err => {
      console.error("Failed to copy link to clipboard", err);
      toast({
        title: "Failed to copy link to clipboard",
        status: "error",
      })
    })
  }

  const handleComment = () => {
    openReply();
    console.log("Pressed comment button");
  }

  if (!hasButtons) return null;
  return (
    <CardFooter className="flex gap-1">
      <PostCardInteractionButton 
        initialCount={likeCount}
        activeColor="#f91980"
        inactiveColor=""
        color="pink"
        callBack={handleLike} 
        Icon={Heart} 
      />
      <PostCardActionButton
        initialCount={commentCount}
        color="blue"
        callBack={handleComment}
        Icon={MessageCircle}
      />
      <PostCardActionButton
        initialCount={shareCount}
        color="green"
        callBack={handleShare}
        Icon={Share2}
      />
    </CardFooter>
  )
}
export default PostCardPreviewFooter