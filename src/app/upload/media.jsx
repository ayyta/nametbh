'use client';
import Image from "next/image";

export default function Media({ media, setMedia }) {

  return media.map((mediaImage) => {
    return (
      <>
        <div className="m-2">
          <Image
            src={mediaImage}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              display: "flex",
              width: "min-content",
              height: "min-content"
            }}
            alt="Media of choice"
            className="rounded-lg object-contain"
          />
          <button
            className="absolute top-0.5 right-0.5 z-50"
            onClick={() => 
              setMedia(media.filter((e) => e !== mediaImage))
            }
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
  })
  
}