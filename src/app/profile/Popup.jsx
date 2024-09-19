"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useAuth } from "@/components/wrappers/AuthCheckWrapper";
import { PopupForm } from "./PopupForm";

export default function Popup({ setIsPopupOpen }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  const { control, setValue } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function fetchUserProfile(userId) {
    try {
      const response = await fetch(`/api/profile?userId=${userId}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      setUserProfile(data[0]);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [user]);

  return (
    <div className="flex flex-col w-3/5 items-center justify-center">
      <Card className="w-full h-auto border-none flex flex-col rounded-t-3xl bg-[#313131]">
        <CardHeader
          className="rounded-t-3xl flex items-end h-[150px]"
          style={{
            backgroundImage: userProfile?.profile_background
              ? `url(${userProfile.profile_background})`
              : "none",
            backgroundColor: userProfile?.profile_background
              ? "transparent"
              : "rgb(55 65 81)", //bg-gray-700 
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Cross2Icon
            className="w-9 h-9 p-2 cursor-pointer rounded-full text-gray-300 hover:bg-gray-500 hover:rounded-full transition duration-300 ease-in"
            onClick={() => setIsPopupOpen(false)}
          />
        </CardHeader>
        <div className="flex gap-2 mt-[-75px] p-6">
          <div className="flex justify-end items-end">
            <Image
              src={
                userProfile && userProfile.pfp
                  ? userProfile.pfp
                  : "/Generic avatar.svg"
              }
              width={120}
              height={120}
              alt="Avatar logo"
            />
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow text-2xl">
          <main className="flex bg-primary flex-grow rounded-3xl justify-center items-center">
            <PopupForm
              userID={user.id}
              user={userProfile}
              initialValues={{ username: "", email: "", password: "" }}
            />
          </main>
        </CardContent>{" "}
      </Card>
    </div>
  );
}
