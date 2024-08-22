'use client';
import Image from "next/image";

export default function Header({ close }) {
  return (
    <>
      <div className="upload-header">
        <div className="upload-avatar">
          <Image 
            src="/Generic avatar.svg"
            width={50}
            height={0}
            alt="Avatar logo"
          />
        </div>
        <button 
          className="upload-close-button"
          onClick={close}
        >
          <Image
            src="/Close Icon.svg"
            width={32}
            height={0}
            alt="Close logo" 
          />
        </button>
      </div>
    </>
  );
}