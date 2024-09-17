"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from 'next/font/google'

import { signOut } from "@/lib/auth";
import { uploadFile } from "@/lib/s3Functions";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SkeletonProfile } from "@/components/SkeletonComponents";
import PostCard from "@/components/post-card"
  
const roboto = Roboto({
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Profile() {

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

  const handleLogout = () => {
    signOut(router);
  }

  function formatNumber(num) {
    if (Math.abs(num) >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';  // Converts to millions (M)
    } else if (Math.abs(num) >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K';  // Converts to thousands (K)
    } else {
      return num.toString();  // Less than 1,000 stays as is
    }
  }

  let backgroundStyle = {
    backgroundImage: user.profile_background !== "" ? `url('${user.profile_background}')`: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
  }

  return (
    <>
      <div className="w-full h-full flex flex-col overflow-y-scroll">
        <div className={`w-full h-64	p-10 flex ${user.profile_background === "" ? "bg-gray-700" : ""}`} style={backgroundStyle}>
          <Avatar className="md:w-28 md:h-28">
            <AvatarImage src={user.pfp} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={`flex-1 ml-6 flex flex-col ${roboto.className}`}>
            <p className={`text-white text-3xl font-bold `}>{user.name}</p>
            <p className="text-lg text-gray-400">@{user.username}</p>

            <p className="text-xl text-white font-normal my-4">{user.bio}</p>
            
            <div className="flex-grow"></div>
            <p className="text-lg text-gray-400 mt-auto">{formatNumber(user.num_of_followers)} Followers</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {loading ? <SkeletonProfile/> : null}
        <TestS3Button className="bg-white"/>

        <div className="w-full h-full flex justify-center">
          <PostCard/>

        </div>

      </div>

    </>
  )
}


const TestS3Button = () => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handlePOSTClick = async () => {
    const formData = new FormData();
    
    // Append all files to form data
    for (const file of files) {
      formData.append("files", file);
    }

    // Append path to form data
    formData.append("path", "test/");

    // Upload files to S3 given path and files
    try {
      const response = await fetch("/api/s3", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        // indicate some error in frontend
      }
    } catch (error) {
      console.error(error);
      // indicate some error in frontend

    }

    setFiles([]);

    const data = await response.json();

    console.log("response data from api s3", data.data);
  }

  const handleFileChange = (event) => {
    const targetFile = event.target.files[0];
    setFiles([...files, targetFile]);
  };

  const handleGETClick = async () => {
    // Query S3 paths to get image links
    const params = new URLSearchParams();

    const s3Paths = ["test/efe010a494c5a", "test/093d6854700e1"];

    s3Paths.forEach((imagePath) => {
      params.append("image", imagePath);
    });
    

    try {
      const response = await fetch(`/api/s3?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();
      setImages(data.data);
    } catch (error) {
      console.error(error);
      // indicate some error in frontend
    }
  }
  return (
    <>
    <input
      type="file" 
      ref={fileInputRef}
      onChange={handleFileChange}
      className=""
    />
    <Button       
      variant="ghost" 
      size="lg"
      onClick={handleGETClick}
      className="bg-white p-10 w-fit"
    >hello</Button>

    {images.map((image, index) => {
      return (
        <img key={index} src={image} alt="uploaded" className="w-20 h-20"/>
      )
    })}
    </>
  )
}
/*
  user_id: null,
  post_id: null,
  text_content: "",
  likes: "",
  comment_count: "",
  created_at: "",
*/