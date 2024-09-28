"use client";
import { useEffect, useState, useRef } from "react";
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

  const fileUploadRef = useRef();

  async function fetchUserProfile(userId) {
    try {
      const response = await fetch(`/api/profile/user?userId=${userId}`, {
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

  const handleEdit = async (dataType) => {
    fileUploadRef.current.click(); // Trigger file input

    const uploadMedia = async (e) => {
      const selectedFile = e.target.files[0]; // Get the selected file
      if (!selectedFile) return;

      const apiCall = dataType === "pfp" ? "pfp" : "banner";
      const currentMediaPath =
        userProfile[dataType === "pfp" ? "pfp" : "profile_background"]; // Current media path (S3 path)

      try {
        // Step 1: Delete the current file from S3 if it exists
        if (currentMediaPath) {
          await deleteCurrentFile(currentMediaPath);
        }

        // Step 2: Upload the new file to S3
        const uploadedPath = await uploadNewFile(selectedFile, dataType);

        // Step 3: Optionally, update the UI state with the new file (for preview purposes)
        console.log(`${dataType} updated successfully: ${uploadedPath}`);
      } catch (error) {
        console.error(`Error updating ${apiCall}:`, error.message);
      }

      // Clean up file input
      fileUploadRef.current.value = null;
    };

    fileUploadRef.current.onchange = uploadMedia; // Attach onchange handler
  };

  // Helper function to delete the current file from S3
  const deleteCurrentFile = async (path) => {
    const response = await fetch(`/api/s3`, {
      method: "DELETE",
      body: JSON.stringify({ paths: [path] }),
    });
    const result = await response.json();
    if (response.ok) {
      console.log("Deleted current file from S3:", result);
    } else {
      throw new Error(result.error || "Failed to delete the file from S3");
    }
  };

  // Helper function to upload the new file to S3
  const uploadNewFile = async (file, dataType) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("path", "media"); // Define your S3 upload path here

    const response = await fetch(`/api/s3`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      try {
        const path = result.path;
        await updateUserInfo(dataType, path, user.id);
      } catch (err) {
        console.error("Error updating user info:", err);
      }
    } else {
      throw new Error(result.error || "Failed to upload the new file to S3");
    }
  };

  async function updateUserInfo(field, value, userID) {
    try {
      const response = await fetch(
        `/api/profile/user?userId=${userID}&field=${field}&value=${value}`,
        {
          method: "PUT",
        }
      );
      if (!response) {
        throw new Error("No response from server");
      }

      const data = await response.json(); // Parse the JSON response
      if (response.status === 409) {
        throw new Error(data.error); // Handle "already taken" errors
      }
      if (!response.ok) {
        throw new Error("Failed to update user info");
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <div className="flex flex-col w-3/5 items-center justify-center">
      <Card className="w-full h-auto border-none flex flex-col rounded-t-3xl bg-[#313131]">
        <CardHeader
          className="relative rounded-t-3xl flex items-end h-[150px]"
          style={{
            backgroundImage: userProfile?.profile_background
              ? `url(${userProfile.profile_background})`
              : "none",
            backgroundColor: userProfile?.profile_background
              ? "transparent"
              : "rgb(55 65 81)", // bg-gray-700
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-3xl flex justify-center items-center">
            {/* Inner gray*/}
            <button
              className="bg-black bg-opacity-65 rounded-full p-4 hover:cursor-pointer hover:opacity-75 transition duration-200 ease-in"
              onClick={() => handleEdit("banner")}
            >
              <Image
                src="/Close Icon.svg" // Replace with Edit Icon
                width={20}
                height={20}
                alt="Edit icon"
                className="object-contain"
              />
            </button>
            <input
              type="file"
              ref={fileUploadRef}
              accept="image/png, image/jpeg"
              hidden
            />
          </div>

          <Cross2Icon
            className="relative z-10 w-9 h-9 p-2 hover:cursor-pointer rounded-full text-gray-300 hover:bg-gray-500 hover:rounded-full transition duration-300 ease-in"
            onClick={() => setIsPopupOpen(false)}
          />
        </CardHeader>
        <div className="relative flex gap-2 mt-[-75px] p-6">
          {/* This is the avatar */}
          <div className="relative">
            <Image
              src={
                userProfile && userProfile.pfp
                  ? userProfile.pfp
                  : "/Generic avatar.svg"
              }
              width={120}
              height={120}
              alt="Avatar logo"
              className="object-cover rounded-full"
            />
            {/* This is the graying affect  */}
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-45 rounded-full">
              {/* This is the inner gray  */}
              <button
                className="bg-black bg-opacity-65 rounded-full p-4 hover:cursor-pointer hover:opacity-75 transition duration-200 ease-in"
                onClick={() => handleEdit("pfp")}
              >
                <Image
                  src="/Close Icon.svg" // Replace with Edit Icon
                  width={20}
                  height={20}
                  alt="Edit icon"
                  className="object-contain"
                />
              </button>
            </div>
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
