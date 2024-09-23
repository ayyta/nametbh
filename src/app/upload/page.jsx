"use client";
import "../../styles/uploadpage.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import Header from "./header";
import MediaButton from "./mediabutton";
import Media from "./media";
import GiphyButton from "./giphybutton";
import GiphySelector from "./giphyselector";

export default function Upload({ open, onClose }) {
  if (!open) return null

  const handler = () => {
    if (open) {
      onClose();
    }
  }

  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [showGifs, setShowGifs] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  /**
   * useEffect hook to log the current media state, it only triggers whenever the media state changes
   */
  useEffect(() => {
    console.log("media", media);
  }, [media]);

  /**
   * Handles the POST request to the server(S3 Bucket)
   */
  const handlePOSTButton = async () => {
    // console.log(e.target);
    // e.preventDefault();

    const formData = new FormData();
    const path = "media/";

    // Append file to form data object
    media.forEach((m) => {
      formData.append("files", m.file);
    });

    // Append path to form data object
    formData.append("path", path);

    // Send POST request to S3 Bucket
    try {
      const response = await fetch("/api/s3", {
        method: "POST",
        body: formData,   // if were sending text it would be JSON.stringify()
      });

      if (response.error) {
        console.error("Error uploading file to S3");
      }
  
      const data = await response.json();
  
      // data.data is the array of image paths in s3
      console.log(data.data);

    } catch (error) {
      //indicated frontend error
      console.error(error);
    }

    // const post = { text, media }
    // console.log(post);
  }

  return (
    <>
      <div className="upload-popup-container">
        <div className="upload-overlay" onClick={handler}></div>
        <GiphySelector 
          gifs={gifs}
          setGifs={setGifs}
          showGifs={showGifs}
          setShowGifs={setShowGifs}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
        <form 
          className="upload-container" 
          onSubmit={(e) => e.preventDefault()}
          // The height of the form is set to min-content if there is media else it is set to 288px
          style={{
            "height" : `${media.length > 0 ? "min-content" : "288px"}`,
            "width" : `${media.length > 0 ? "644px" : "552px"}`,
            "z-index" : `${showGifs ? "10" : "20"}`,
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
                images={media} 
                setMedia={setMedia}
                gifs={gifs}
                setGifs={setGifs} 
                showGifs={showGifs}
                setShowGifs={setShowGifs}
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
              {/* <Link 
                href="/upload/giphy"
                // gifs={gifs}
                // setGifs={setGifs}
                // showGifs={showGifs}
                // setShowGifs={setShowGifs}
              >  */}
              <GiphyButton 
                showGifs={showGifs}
                setShowGifs={setShowGifs}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
              />
              {/* </Link> */}
            </div>
            <div className="upload-utilities-right-section">
              <button 
                className="upload-button"
                onClick={handlePOSTButton}
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