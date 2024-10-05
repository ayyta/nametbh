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


  const handlePost = async () => {
    const mediaPaths = await uploadToS3();

    if (!mediaPaths) {
      console.error("Error uploading media to S3");
      return;
    }

    const post = { 
      text, 
      media: mediaPaths, 
    };

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(post),
      });

      const result = await response.json();
      console.log("Post successful", result);
    } catch (error) {
      console.error("Error posting", error);
    }

    // const formData = new FormData();
    // const path = "media/";

    // formData.append("text", text);

    // // Append file to form data object
    // media.forEach((m) => {
    //   formData.append("files", m.file);
    // });

    // // Append path to form data object
    // formData.append("path", path);

    // const post = { text, media }
    // console.log(post);
  }

  /**
  * Handles the POST request to the server(S3 Bucket)
  */
  const uploadToS3 = async () => {
    const formData = new FormData();
    const path = "media/";

    formData.append("text", text);

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
      return data.data;

    } catch (error) {
      //indicated frontend error
      console.error(error);
      return null;
    }
  }


  // const uploadToS3 = async (files) => {
  //   const mediaPaths = [];

  //   for (const file of files) {
  //     if (file.type !== 'image/gif') {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("path", "media/");

  //       try {
  //         const response = await fetch("/api/s3", {
  //           method: "POST",
  //           body: formData,
  //         });

  //         const data = await response.json();

  //         if (data.url) {
  //           mediaPaths.push(data.url);
  //         } else {
  //           console.error("Error uploading file to S3");
  //         }
  //       } catch (error) {
  //         console.error("Error uploading to S3:", error);
  //       }
  //     }
  //   }

  //   return mediaPaths
  // }

  // const handlePost = async () => {
  //   const mediaWithFile = media.filter((m) => m.file && m.file.type);

  //   const mediaPaths = await uploadToS3(media.filter((m) => m.file.type !== "image/gif"));

  //   if (!mediaPaths.length && !media.some(m => m.file.type === 'image/gif')) {
  //     console.error("Error uploading media to S3");
  //     return;
  //   }

  //   const gifURLS = media
  //     .filter((m) => m.file.type === "image/gif")
  //     .map((m) => m.url);

  //   const post = {
  //     text,
  //     media: [...mediaPaths, ...gifURLS],
  //   }

  //   try {
  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(post),
  //     });

  //     const result = await response.json();
  //     console.log("Post successful", result);
  //   } catch (error) {
  //     console.error("Error posting", error);
  //   }
  // }



  // Create a function to handle the addition of media due to the issue of having multiple alerts when the media limit is reached in the image/video vs gif upload
  const handleAddMedia = (newMediaArray) => {
    // Check the media limit which is 4
    if (media.length + newMediaArray.length > 4) {
      alert("You can only upload a maximum of 4 media files");
      return;
    }

    // Upload the media state
    setMedia((prevMedia) => [...prevMedia, ...newMediaArray]);
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
          images={media}
          setMedia={handleAddMedia}
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
              />
            </div>
            <div className="upload-utilities-left-section">
              <MediaButton
                media={media} 
                setMedia={handleAddMedia} 
              />
              <button className="upload-utilities">
                <Image
                  src="/Mic Icon.svg"
                  width={28}
                  height={0}
                  alt="Mic logo" 
                />
              </button>
              <GiphyButton 
                showGifs={showGifs}
                setShowGifs={setShowGifs}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
              />
            </div>
            <div className="upload-utilities-right-section">
              <button 
                className="upload-button"
                onClick={handlePost}
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