"use client";
import "../../styles/uploadpage.css";
import { useState } from "react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import Header from "./header";
import MediaButton from "./mediabutton";
import Media from "./media";

export default function Upload({ open, onClose }) {
  if (!open) return null

  const handler = () => {
    if (open) {
      onClose();
    }
  }

  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);

  /** Function handleSubmit logs the input text, however the issue is that whenever we click any button like the GIF button for example it still logs hte input text */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const post = { text }

    console.log(post);
  }

  return (
    <>
      <div className="upload-popup-container">
        <div className="upload-overlay" onClick={handler}></div>
        <form 
          className="upload-container" 
          onSubmit={handleSubmit}
          // The height of the form is set to max-content if there is media else it is set to 288px
          style={{
            "height" : `${media.length > 0 ? "max-content" : "288px"}`,
            "width" : `${media.length > 0 ? "644px" : "552px"}`,
          }}
        >
          <div className="upload">
            <Header close={onClose} />
            <div 
              className="upload-body-container"
              style={{
                "width" : `${media.length > 0 ? "608px" : "516px"}`,
              }}
            >
              <TextareaAutosize
                className="upload-body"
                minRows={1}
                maxRows={5}
                placeholder="Enter Text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="upload-image-container">
              <Media 
                media={media} 
                setMedia={setMedia} 
                text={text}
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