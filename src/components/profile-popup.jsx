'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';


export default function ProfilePopup({}) {
  const [tempUser, setTempUser] = useState({
    pfp: '',
    name: 'Beth',
    username: 'beth_rose',
    bio: 'sugma',
    following_count: 31,
    follower_count: 31,
    followsYou: true,
    following: false,
    friends: false,
  });

  const getButtonText = () => {
    if (tempUser.following) {
      return 'Following';
    } else if (tempUser.followsYou) {
      return 'Follow Back';
    }
    return 'Follow';
  };

  const handleFollowClick = () => {
    if (tempUser.following) {
        setTempUser((prev) => ({
            ...prev,
            following: false,
            follower_count: prev.follower_count - 1,
        }))
    }
    else{
        setTempUser((prev) => ({
            ...prev,
            following: true,
            follower_count: prev.follower_count + 1,
        }))
    }
  };

  return (
    <div className="rounded-2xl bg-red-300 w-[430px] h-auto flex flex-col p-2">
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
            <p>{tempUser.name}</p>
            <p>@{tempUser.username}</p>
          </div>
        </div>
        <DotsHorizontalIcon className="w-5 h-5" />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <p>{tempUser.bio}</p>
        <div className="flex gap-4">
            <p>{tempUser.following_count} Following</p>
            <p>{tempUser.follower_count} Followers</p>
        </div>
        <Button
          className={`transition-colors ${tempUser.following ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
          variant="secondary"
          onClick={() => handleFollowClick()}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}
