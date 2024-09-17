"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-col items-center justify-center">
      <Label className="text-4xl">My Account</Label>
      <Card className="w-[75vw] h-[90vh] border-none flex flex-col rounded-t-3xl bg-[#313131]">
        <CardHeader
          className="rounded-t-3xl h-48 flex items-end"
          style={{
            backgroundImage:
              userProfile && userProfile.profile_background
                ? `url(${userProfile.profile_background})`
                : "none",
            backgroundColor: !userProfile?.profile_background
              ? "skyblue"
              : "transparent",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Cross2Icon
            className="w-9 h-9 cursor-pointer"
            onClick={() => setIsPopupOpen(false)}
          />
        </CardHeader>
        <div className="flex gap-2 mt-[-50px] p-6">
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
            <p className="text-white text-2xl italic">
              {userProfile && userProfile.username
                ? `@${userProfile.username}`
                : "Loading..."}
            </p>
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow text-2xl">
          <main className="flex bg-primary flex-grow rounded-3xl justify-center items-center">
            {/* UserForm component that handles form logic */}
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
