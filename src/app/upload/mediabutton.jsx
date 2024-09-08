import Image from "next/image";
import { useRef } from "react";

export default function MediaButton({ media, setMedia }) {

  /**
   * The useRef hook creates a reference to the upload button
   */
  const fileUploadRef = useRef();
  const handleMediaUpload = () => {
    fileUploadRef.current.click();
  }

  const uploadMediaDisplay = (e) => {
    const selectedFiles = e.target.files;
    // console.log(selectedFiles);
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setMedia(imagesArray);

    // const uploadedFile = fileUploadRef.current.files[0];

    // const cachedURL = URL.createObjectURL(uploadedFile);

    // setMedia(cachedURL);
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
          multiple accept="image/png, image/jpeg"
          hidden
        />
    </>
  );
}