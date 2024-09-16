"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Roboto } from "next/font/google";
import Popup from "./Popup";

import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkeletonProfile } from "@/components/SkeletonComponents";
import PostCard from "@/components/post-card";

const roboto = Roboto({
  weight: ["100", "300", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function Profile() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // {
  //   name: "",
  //   username: "",
  //   bio: "",
  //   pfp: "",
  //   profile_background: "",
  //   num_of_followers: 0,
  // }
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
  const [posts, setPosts] = useState([
    {
      user_id: null,
      post_id: null,
      title: "",
      text_content: "",
      like_count: "",
      dislike_count: "",
      comments: "",
      created_at: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    signOut(router);
  };

  function formatNumber(num) {
    if (Math.abs(num) >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M"; // Converts to millions (M)
    } else if (Math.abs(num) >= 1_000) {
      return (num / 1_000).toFixed(1) + "K"; // Converts to thousands (K)
    } else {
      return num.toString(); // Less than 1,000 stays as is
    }
  }

  let backgroundStyle = {
    backgroundImage:
      user.profile_background !== "" ? `url('${user.profile_background}')` : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div className="w-full h-full flex flex-col relative">
        <div
          className={`w-full h-64	p-10 flex ${
            user.profile_background === "" ? "bg-gray-700" : ""
          }`}
          style={backgroundStyle}
        >
          <Avatar className="md:w-28 md:h-28">
            <AvatarImage src={user.pfp} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className={`flex-1 ml-6 flex flex-col ${roboto.className}`}>
            <p className={`text-white text-3xl font-bold `}>{user.name}</p>
            <p className="text-lg text-gray-400">@{user.username}</p>

            <p className="text-xl text-white font-normal my-4">{user.bio}</p>

            <div className="flex-grow"></div>
            <p className="text-lg text-gray-400 mt-auto">
              {formatNumber(user.num_of_followers)} Followers
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="rounded-3xl bg-primary text-white border-2 border-white hover:bg-white hover:text-primary transition-colors duration-200"
          >
            Edit Profile
          </Button>

          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        {loading ? <SkeletonProfile /> : null}

        <div className="w-full h-full flex justify-center">
          <PostCard />
        </div>
        {isPopupOpen && (
          <>
            {/* Backdrop overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

            {/* Popup*/}
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <Popup setIsPopupOpen={setIsPopupOpen} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

/*
  user_id: null,
  post_id: null,
  text_content: "",
  likes: "",
  comment_count: "",
  created_at: "",
*/
