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
import supabaseAnon from "@/lib/supabaseAnonClient";
import { useRouter } from "next/navigation";

export default function Upload({ open, onClose }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [showGifs, setShowGifs] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const Router = useRouter();

  if (!open) return null

  const handler = () => {
    if (open) {
      Router.push('/home');
      onClose();
    }
  }

  /**
   * useEffect hook to log the current media state, it only triggers whenever the media state changes
   */
  // useEffect(() => {
  //   // console.log("media", media);
  //   console.log(media);
  //   media.map((mediaFile) => {
  //     console.log(mediaFile.type);
  //     // Append file to form data object
  //     if (mediaFile.type === "image/gif") {
  //       console.log("GIF URL", mediaFile.url);
  //     } else {
  //       console.log("Media File", mediaFile.file);
  //     }
  //   })
  // }, [media]);


  // Sends a POST request to the server
  const handlePost = async () => {
    const { data: { session } } = await supabaseAnon.auth.getSession();
    // console.log(session);

    const mediaPaths = await uploadToS3(); // ["media/as234234"]
    // console.log(JSON.stringify(mediaPaths));

    if (!mediaPaths) {
      console.error("Error uploading media to S3");
      return;
    }

    // Create the form data
    const formData = new FormData();
    formData.append("text", text);
    formData.append("media_path", JSON.stringify(mediaPaths));
    formData.append("user_id", session.user.id);
    
    // Access the url for the GIFS
    media.forEach((mediaFile) => {
      if (mediaFile.type === "image/gif") {
        formData.append("url", mediaFile.url);
      }
    })

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.error("Error posting");
      }

      // const result = await response.json();
      console.log("Post successful");
    } catch (error) {
      console.error("Error posting", error);
    }

    // Redirect to the home page and close the popup
    Router.push('/home');
    onClose();
  }

  // Handles the POST request to the server(S3 Bucket)
  const uploadToS3 = async () => {
    const formData = new FormData();
    const path = "media/";

    media.map((mediaFile) => {
      // Append file to form data object
      formData.append("files", mediaFile.file);
    })

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
          className={`upload-container ${media.length > 0 ? 'media-present' : 'media-absent'}`} 
          onSubmit={(e) => e.preventDefault()}
          // The height of the form is set to min-content if there is media else it is set to 288px
          style={{
            // "height" : `${media.length > 0 ? "min-content" : "288px"}`,
            // "width" : `${media.length > 0 ? "644px" : "552px"}`,
            "z-index" : `${showGifs ? "10" : "20"}`,
          }}
        >
          <div className="upload">
            <Header close={onClose} router={Router} />
            <div className={`upload-body-container ${media.length > 0 ? 'upload-body-container-present' : 'upload-body-container-absent'}`}>
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