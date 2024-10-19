'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';


export default function ProfilePopup({user, setUser}) {
//   const [tempUser, setUser] = useState({
//     pfp: '',
//     name: 'Beth',
//     username: 'beth_rose',
//     bio: 'sugma',
//     following_count: 31,
//     follower_count: 31,
//     followsYou: true,
//     following: false,
//     friends: false,
//   });

  const getButtonText = () => {
    if (user.following) {
      return 'Following';
    } else if (user.followsYou) {
      return 'Follow Back';
    }
    return 'Follow';
  };

  const handleFollowClick = () => {
    if (user.following) {
        setUser((prev) => ({
            ...prev,
            following: false,
            follower_count: prev.follower_count - 1,
        }))
    }
    else{
        setUser((prev) => ({
            ...prev,
            following: true,
            follower_count: prev.follower_count + 1,
        }))
    }
  };

  return (
    <div className="rounded-2xl bg-primary w-[430px] h-auto flex flex-col p-2 border-[1px] border-white">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image
            src="/Generic avatar.svg"
            width={40}
            height={40}
            alt="Avatar logo"
            className="object-cover mr-3"
          />
          <div className="flex flex-col">
            <p>{user.name}</p>
            <p>@{user.username}</p>
          </div>
        </div>
        <DotsHorizontalIcon className="w-5 h-5" />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <p>{user.bio}</p>
        <div className="flex gap-4">
            <p>{user.following_count} Following</p>
            <p>{user.follower_count} Followers</p>
        </div>
        <Button
          className={`transition-colors ${user.following ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
          variant="secondary"
          onClick={() => handleFollowClick()}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}
