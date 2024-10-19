import Image from "next/image";
import { useRef } from "react";

export default function MediaButton({ setMedia }) {

  /**
   * The useRef hook creates a reference to the upload button
   */
  const fileUploadRef = useRef();
  const handleMediaUpload = () => {
    fileUploadRef.current.click();
  }

  const uploadMediaDisplay = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    // File size limit is 200MB
    const maxFileSize = 200 * 1024 * 1024; // 200MB

    // Create an array to store media objects with URL and type(image/video)
    const mediaArray = selectedFilesArray
      .filter((file) => {
        if (file.size > maxFileSize) {
          alert("File size is too large. Max file size is 200MB");
          return false;
        }
        return true;
      })
      .map((file) => ({
        url : URL.createObjectURL(file),
        type : file.type,
        file : file,
      }));

    setMedia(mediaArray);

    // Reset the input value
    fileUploadRef.current.value = null;

    selectedFilesArray.map((file) => {
      return URL.revokeObjectURL(file);
    }); 
  }

  return (
    <>
      <button 
        className="upload-utilities"
        onClick={handleMediaUpload}
      >
        <Image
          src="/Video Icon.svg"
          width={28}
          height={0}
          alt="Media logo" 
        />
      </button>
      <input 
          type="file"
          ref={fileUploadRef}
          onChange={uploadMediaDisplay}
          multiple accept="image/png, image/jpeg, video/mp4, video/x-m4v, video/*"
          hidden
        />
    </>
  );
}