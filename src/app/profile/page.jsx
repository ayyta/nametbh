"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from 'next/font/google'

import { Button } from "@/components/ui/button"
import { SkeletonProfile } from "@/components/SkeletonComponents";
import PostCardPreview from "@/components/post-card/post-card-preview"
import Header from "./header"
const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Component() {

  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe",
    bio: "I'm a software engineer",
    pfp: "/Generic avatar.svg",
    profile_background: "", // /Home Icon.svg
    num_of_followers: 0,
  });

  
  /*
  {
    user_id: null,
    post_id: null,
    title: "",
    text_content: "",
    like_count: "",
    dislike_count: "",
    comments: "",
    created_at: "",
  } 
  */

  // Generate 20 posts at a time
  const [posts, setPosts] = useState([{
    user_id: null,
    post_id: null,
    title: "",
    text_content: "",
    like_count: "",
    dislike_count: "",
    comments: "",
    created_at: "",
  }]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();



  return (
    <>
      <div className="w-full h-full flex flex-col overflow-y-scroll">
        {loading ? <SkeletonProfile/> : <Header user={user} roboto={roboto} router={router}/>}

        <div className="w-full h-full flex justify-center">
          <PostCardPreview/>
        </div>

      </div>

    </>
  )
}
