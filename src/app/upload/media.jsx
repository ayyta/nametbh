import Image from "next/image";
import { useState , useRef } from "react";

export default function MediaButton({ media, setMedia }) {

  // const [media, setMedia] = useState("");
  const fileUploadRef = useRef();

  const handleMediaUpload = (e) => {
    // e.preventDefault();

    fileUploadRef.current.click();
  }

  const uploadMediaDisplay = (e) => {
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
          // src={media}
          width={28}
          height={0}
          alt="Media logo" 
        />
      </button>
      <input 
          type="file"
          ref={fileUploadRef}
          onChange={uploadMediaDisplay}
          hidden
        />
    </>
  );
}