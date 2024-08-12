"use client";
import Image from "next/image";

export default function Upload({ open, onClose }) {
  if (!open) return null


  const handler = () => {
    if (open) {
      onClose();
    }
  }

  return (
    <>
      <div className="upload-popup-container">
        <div className="upload-overlay" onClick={handler}></div>
        <div className="upload">
          <div className="upload-container">
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
                onClick={onClose}
              >
                <Image
                  src="/Close Icon.svg"
                  width={32}
                  height={0}
                  alt="Close logo" 
                />
              </button>
            </div>
            <div className="upload-body-section">
              <textarea 
                className="upload-body" 
                placeholder="Enter Text..." 
                required 
              />
            </div>
            <div className="upload-utilities-left-section">
              <button className="upload-utilities">
                <Image
                  src="/Video Icon.svg"
                  width={28}
                  height={0}
                  alt="Video logo" 
                />
              </button>
              <button className="upload-utilities">
                <Image
                  src="/Mic Icon.svg"
                  width={28}
                  height={0}
                  alt="Mic logo" 
                />
              </button>
              <button className="upload-utilities">
                <Image
                  src="/Gif Icon.svg"
                  width={28}
                  height={0}
                  alt="Gif logo" 
                />
              </button>
            </div>
            <div className="upload-utilities-right-section">
              <button className="upload-button">
                Post
              </button>
            </div>
          </div>
        </div>      
      </div>
    </>
  );
}