"use client";
import { useEffect, useState, useRef } from "react";
import { set, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useAuth } from "@/components/wrappers/AuthCheckWrapper";
import { PopupForm } from "./PopupForm";

export default function Popup({ setIsPopupOpen }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [pfpPath, setPfpPath] = useState(null);
  const [bannerPath, setBannerPath] = useState(null);
  const [pfpLink, setPfpLink] = useState(null);
  const [bannerLink, setBannerLink] = useState(null);

  const { control, setValue } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const fileUploadRef = useRef();

  //   make another helper function to call the fetch the media paths by ids by passing in the pfpid and bannerid from this get request below and then instead of calling the getMediaPathsbyids later one we can just call it up here and then store it in a state variable
  async function fetchUserProfile(userId) {
    try {
      const response = await fetch(`/api/profile/user?userId=${userId}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      setUserProfile(data[0]);
      const { pfpPath, bannerPath } = await fetchMediaPathByIds(
        data[0].pfp,
        data[0].profile_background
      );
      setPfpPath(pfpPath);
      setBannerPath(bannerPath);
      const mediaLinks = await gets3Images(pfpPath, bannerPath);

      setPfpLink(mediaLinks[0]);
      setBannerLink(mediaLinks[1]);
    } catch (error) {
      console.error(error.message);
    }
  }

  const gets3Images = async (pfpId, bannerId) => {
    const params = new URLSearchParams();
    const s3Paths = [pfpId, bannerId];
    s3Paths.forEach((imagePath) => {
      params.append("paths", imagePath);
    });
    try {
      const response = await fetch(`/api/s3?${params.toString()}`, {
        method: "GET",
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error using GET on s3 buckets: ", error.message);
    }
  };

  const fetchMediaPathByIds = async (pfpId, bannerId) => {
    try {
      const urlParams = new URLSearchParams();

      if (pfpId) urlParams.append("pfpId", pfpId);
      if (bannerId) urlParams.append("bannerId", bannerId);

      const query = urlParams.toString();

      const response = await fetch(`/api/profile/media?${query}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch media path");
      }

      const result = await response.json();
      //   console.log("Got media path from user:", result);
      return result.data; // Safely access the media path
    } catch (error) {
      console.error("Error fetching media path:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile(user.id);
    }
  }, [user]);

  const handleEdit = async (dataType, pfpPath, bannerPath) => {
    fileUploadRef.current.click(); // Trigger file input

    const uploadMedia = async (e) => {
      const selectedFile = e.target.files[0]; // Get the selected file
      if (!selectedFile) return;

      const apiCall = dataType === "pfp" ? "pfp" : "banner";
      const mediaId =
        userProfile[dataType === "pfp" ? "pfp" : "profile_background"]; // Current media path (S3 path)
      let currentMediaPath;
      let pathToDelete;
      try {
        // Delete the current file from S3 if it exists
        if (mediaId) {
          const pfpId = dataType === "pfp" ? mediaId : null;
          const bannerId = dataType === "banner" ? mediaId : null;

          // Fetch the current media path using the updated fetchMediaPathByIds function
          currentMediaPath = await fetchMediaPathByIds(pfpId, bannerId);
          pathToDelete =
            dataType === "pfp"
              ? currentMediaPath.pfpPath
              : currentMediaPath.bannerPath;
          await deleteCurrentFile(pathToDelete);
        }

        const uploadedPath = await s3UploadNewFile(selectedFile, dataType);

        await createNewMedia(uploadedPath, user.id, apiCall);

        console.log(`${dataType} updated successfully: ${uploadedPath}`);
      } catch (error) {
        console.error(`Error updating ${apiCall}:`, error.message);
      }

      // Clean up file input
      fileUploadRef.current.value = null;
      //   window.location.reload();
    };

    fileUploadRef.current.onchange = uploadMedia; // Attach onchange handler
  };

  const deleteCurrentFile = async (currentMediaPath) => {
    const params = new URLSearchParams();
    params.append("paths", currentMediaPath);

    const response = await fetch(`/api/s3?${params.toString()}`, {
      method: "DELETE",
    });
    const result = await response.json();

    if (response.ok) {
      console.log("Deleted current file from S3:", result);
    } else {
      console.error("Error in deleting:", result.error);
      throw new Error(result.error || "Failed to delete the file from S3");
    }
  };

  const s3UploadNewFile = async (file, dataType) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("path", "media"); // Define your S3 upload path here

    const response = await fetch(`/api/s3`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to upload the new file to S3");
    }

    return result.data?.[0]; // Return the uploaded path from the S3 upload result
  };

  async function createNewMedia(data, userID, apiCall) {
    const mediaType = "s3";
    try {
      const response = await fetch(`/api/profile/media`, {
        method: "POST",
        body: JSON.stringify({
          userId: userID,
          mediaPath: data,
          mediaType: mediaType,
          apiCall: apiCall,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to upload media");
      }
      const result = await response.json();
      console.log("Media uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading media:", error.message);
    }
  }

  return (
    <div className="flex flex-col w-3/5 items-center justify-center">
      <Card className="w-full h-auto border-none flex flex-col rounded-t-3xl bg-[#313131]">
      <CardHeader
  className="relative rounded-t-3xl flex items-end h-[150px]"
  style={{
    backgroundImage: bannerLink
      ? `url(${bannerLink})`
      : "none",
    backgroundColor: bannerLink
      ? "transparent"
      : "rgb(55 65 81)", // bg-gray-700 as a fallback if no banner
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-3xl flex justify-center items-center">
            {/* Inner gray*/}
            <button
              className="bg-black bg-opacity-65 rounded-full p-4 hover:cursor-pointer hover:opacity-75 transition duration-200 ease-in"
              onClick={() => handleEdit("banner", pfpPath, bannerPath)}
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
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
              <Image
                src={pfpLink ? pfpLink : "/Generic avatar.svg"}
                width={120}
                height={120} // Ensure width and height are equal
                alt="Avatar logo"
                className="object-cover w-full h-full" // Make sure the image covers its container
              />
            </div>

            {/* This is the graying affect  */}
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-45 rounded-full">
              {/* This is the inner gray  */}
              <button
                className="bg-black bg-opacity-65 rounded-full p-4 hover:cursor-pointer hover:opacity-75 transition duration-200 ease-in"
                onClick={() => handleEdit("pfp", pfpPath, bannerPath)}
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