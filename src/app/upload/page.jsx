"use client";
import Image from "next/image";
import { useState } from "react";
import Header from "./header";

export default function Upload({ open, onClose }) {
  const [text, setText] = useState("");

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
            <Header close={onClose} />
            <div className="upload-body-section">
              <textarea 
                className="upload-body" 
                placeholder="Enter Text..." 
                onChange={(e) => setText(e.target.value)}
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
              <button 
                className="upload-button"
                onClick={() => console.log(text)}
              >
                Post
              </button>
            </div>
          </div>
        </div>      
      </div>
    </>
  );
}