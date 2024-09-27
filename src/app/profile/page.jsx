"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from 'next/font/google'

import { Button } from "@/components/ui/button"
import { SkeletonProfile } from "@/components/SkeletonComponents";
import PostCard from "@/components/post-card/post-card"
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

    const s3Paths = ["test/147624e232bbf", "test/093d6854700e1"];

    s3Paths.forEach((imagePath) => {
      params.append("paths", imagePath);
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

  const handleDELETEClick = async () => {

    // Delete files from s3 bucket
    const s3Paths = ["test/efe010a494c5a", "test/093d6854700e1"];
    const params = new URLSearchParams();

    s3Paths.forEach((imagePath) => {
      params.append("paths", imagePath);
    });

    try {
      const response = await fetch(`/api/s3?${params.toString()}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        // indicate some error in frontend
      }
      console.log("response data from api s3", response.data, response);
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