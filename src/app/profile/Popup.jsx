'use client';
import { useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Cross2Icon } from '@radix-ui/react-icons';
import { CameraIcon } from 'lucide-react';
import Image from 'next/image';
import { PopupForm } from './PopupForm';
import { deleteCurrentFile, s3UploadNewFile, createNewMedia } from './utils.js';

export default function Popup({
  fetchUserProfile,
  setIsPopupOpen,
  user,
  userProfile,
  pfpLink,
  bannerLink,
  fetchMediaPathByIds,
}) {
  const fileUploadRef = useRef();

  const handleEdit = async (dataType) => {
    fileUploadRef.current.click();

    const uploadMedia = async (e) => {
      const selectedFile = e.target.files[0]; // Get the selected file
      if (!selectedFile) return;

      const apiCall = dataType === 'pfp' ? 'pfp' : 'banner';
      const mediaId =
        userProfile[dataType === 'pfp' ? 'pfp' : 'profile_background']; // Current media path (S3 path)
      let currentMediaPath;
      let pathToDelete;
      try {
        // Delete the current file from S3 if it exists
        if (mediaId) {
          const pfpId = dataType === 'pfp' ? mediaId : null;
          const bannerId = dataType === 'banner' ? mediaId : null;

          // Fetch the current media path using the updated fetchMediaPathByIds function
          currentMediaPath = await fetchMediaPathByIds(pfpId, bannerId);
          pathToDelete =
            dataType === 'pfp'
              ? currentMediaPath.pfpPath
              : currentMediaPath.bannerPath;
          await deleteCurrentFile(pathToDelete);
        }

        const uploadedPath = await s3UploadNewFile(selectedFile, dataType);
        await createNewMedia(uploadedPath, user.id, apiCall);

        // Refetch the user profile after the update
        await fetchUserProfile(user.id);
      } catch (error) {
        console.error(`Error updating ${apiCall}:`, error.message);
      }

      // Clean up file input
      fileUploadRef.current.value = null;
    };

    fileUploadRef.current.onchange = uploadMedia;
  };

  return (
    <div className="flex flex-col w-3/5 items-center justify-center">
      <Card className="w-4/6 min-w-[534px] h-auto border-none flex flex-col rounded-t-3xl bg-[#313131]">
        {/* This is the header */}
        <CardHeader
          className="relative rounded-t-3xl flex items-end h-[150px]"
          style={{
            backgroundImage: bannerLink ? `url(${bannerLink})` : 'none',
            backgroundColor: bannerLink ? 'transparent' : 'rgb(55 65 81)', // bg-gray-700 as a fallback if no banner
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-3xl flex justify-center items-center z-10">
            {/* Inner gray*/}
            <button
              className="bg-black bg-opacity-65 rounded-full p-4 hover:cursor-pointer hover:opacity-75 transition duration-200 ease-in"
              onClick={() => handleEdit('banner')}
            >
              <CameraIcon
                width={20}
                height={20}
                className="text-gray-300 object-contain"
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
        {/* This is the Avatar code */}
        <div className="relative flex gap-2 mt-[-75px] p-6">
          <div className="relative z-20">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
              <Image
                src={pfpLink ? pfpLink : '/Generic avatar.svg'}
                width={120}
                height={120}
                alt="Avatar logo"
                className="object-cover w-full h-full"
              />
            </div>
            {/* This is the graying affect  */}
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-45 rounded-full">
              {/* This is the inner gray  */}
              <button
                className="bg-black bg-opacity-65 rounded-full p-4 hover:cursor-pointer hover:opacity-75 transition duration-200 ease-in"
                onClick={() => handleEdit('pfp')}
              >
                <CameraIcon
                  width={20}
                  height={20}
                  className="text-gray-300 object-contain"
                />
              </button>
            </div>
          </div>
        </div>
        {/* Form */}
        <CardContent className="flex flex-col flex-grow text-2xl">
          <main className="flex bg-primary flex-grow rounded-3xl justify-center items-center">
            <PopupForm
              userID={user.id}
              user={userProfile}
              initialValues={{ username: '', email: '', password: '' }}
            />
          </main>
        </CardContent>{' '}
      </Card>
    </div>
  );
}
