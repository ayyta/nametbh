"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useAuth } from "@/components/wrappers/AuthCheckWrapper";

const usernameSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
});

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function Popup({ setIsPopupOpen }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({});

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
      setValue("username", data[0].name || "");
      setValue("email", data[0].email || "");
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [user]);

  const handleUsernameSubmit = (data) => {
    const result = usernameSchema.safeParse({ username: data.username });
    if (!result.success) {
      setErrors({ username: result.error.errors[0].message });
    } else {
      setErrors({});
      console.log("Username Data:", { username: data.username });
    }
  };

  const handleEmailSubmit = (data) => {
    const result = emailSchema.safeParse({ email: data.email });
    if (!result.success) {
      setErrors({ email: result.error.errors[0].message });
    } else {
      setErrors({});
      console.log("Email Data:", { email: data.email });
    }
  };

  const handlePasswordSubmit = (data) => {
    const result = passwordSchema.safeParse({ password: data.password });
    if (!result.success) {
      setErrors({ password: result.error.errors[0].message });
    } else {
      setErrors({});
      console.log("Password Data:", { password: data.password });
    }
  };
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
              {userProfile && userProfile.name
                ? `@${userProfile.name}`
                : "Loading..."}
            </p>
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow text-2xl">
          <main className="flex bg-primary flex-grow rounded-3xl justify-center items-center">
            <div className="text-2xl w-full p-8 flex flex-col gap-4 h-full">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUsernameSubmit({
                    username: e.target.username.value,
                  });
                }}
                className="text-2xl w-full p-8 flex flex-col gap-4 h-full"
              >
                <div className="flex flex-col flex-grow">
                  <span className="text-white text-sm font-bold">
                    USERNAME*
                  </span>
                  {errors.username && (
                    <p className="text-red-500">{errors.username}</p>
                  )}
                  <div className="flex w-full items-center">
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter username"
                          className="flex-grow text-white text-3xl h-16"
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      className="ml-2 bg-[#313131] text-xl py-8 px-12"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </form>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailSubmit({
                    email: e.target.email.value,
                  });
                }}
                className="text-2xl w-full p-8 flex flex-col gap-4 h-full"
              >
                <div className="flex flex-col flex-grow">
                  <span className="text-white text-sm font-bold">EMAIL*</span>
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                  <div className="flex w-full items-center">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter email"
                          className="flex-grow text-white text-3xl h-16"
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      className="ml-2 bg-[#313131] text-xl py-8 px-12"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </form>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePasswordSubmit({
                    password: e.target.password.value,
                  });
                }}
                className="text-2xl w-full p-8 flex flex-col gap-4 h-full"
              >
                <div className="flex flex-col flex-grow">
                  <span className="text-white text-sm font-bold">
                    PASSWORD*
                  </span>
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                  <div className="flex w-full items-center">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter password"
                          className="flex-grow text-white text-3xl h-16"
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      className="ml-2 bg-[#313131] text-xl py-8 px-12"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </CardContent>
      </Card>
    </div>
  );
}
