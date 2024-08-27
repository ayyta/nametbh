"use client";
import Image from "next/image";
import { useState } from "react";
import Header from "./header";
import MediaButton from "./media";

export default function Upload({ open, onClose }) {
  if (!open) return null

  const handler = () => {
    if (open) {
      onClose();
    }
  }

  const [text, setText] = useState("");
  const [media, setMedia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const post = { text }

    console.log(post);
  }

  return (
    <>
      <div className="upload-popup-container">
        <div className="upload-overlay" onClick={handler}></div>
        <form className="upload" onSubmit={handleSubmit}>
          <div className="upload-container">
            <Header close={onClose} />
            <div className="upload-body-section">
              <textarea 
                className="upload-body" 
                placeholder="Enter Text..." 
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="upload-utilities-left-section">
              <MediaButton
                media={media} 
                setMedia={setMedia} 
              />
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
              <button 
                className="upload-button"
              >
                Post
              </button>
            </div>
          </div>
        </form>      
      </div>
    </>
  );
}