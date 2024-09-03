import Image from "next/image";
import { useRef } from "react";

export default function MediaButton({ media, setMedia }) {

  const fileUploadRef = useRef();

  const handleMediaUpload = () => {
    // e.preventDefault();

    fileUploadRef.current.click();
  }

  const uploadMediaDisplay = () => {
    const uploadedFile = fileUploadRef.current.files[0];

    const cachedURL = URL.createObjectURL(uploadedFile);

    setMedia(cachedURL);
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
          multiple onChange={uploadMediaDisplay}
          hidden
        />
    </>
  );
}