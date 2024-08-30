"use client";
import "../../styles/uploadpage.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const textAreaRef = useRef("");

  /** Function handleSubmit logs the input text, however the issue is that whenever we click any button like the GIF button for example it still logs hte input text */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const post = { text }

    console.log(post);
  }

  useEffect(() => {
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [text])

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
                rows="1"
                value={text}
                onChange={(e) => setText(e.target.value)}
                ref={textAreaRef}
              />
            </div>
            <div className="upload-image"> 
              <Image
                // src="/Generic avatar.svg"
                src={media}
                width={0}
                height={0}
                sizes="100vw"
                // media is "" by default resulting in a falsey value therefore the display is set to none else the media is displayed
                style={{display: `${media ? "block" : "none"} `, width: "min-content", height: "min-content"}}
                alt="Media of choice"
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