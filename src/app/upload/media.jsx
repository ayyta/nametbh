'use client';
import Image from "next/image";

export default function Media({ media, setMedia }) {

  return media.map((mediaImage) => {
    return (
      <>
        <div className="relative m-2 object-contain">
          <Image
            src={mediaImage}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              "display" : "flex",
              "width" : "min-content",
              "height" : "min-content",
              "max-width" : "400px",
              "max-height" : "400px"
            }}
            alt="Media of choice"
            className="rounded-lg object-contain"
          />
          <button
            className="absolute top-1.5 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer"
            onClick={() => 
              setMedia(media.filter((e) => e !== mediaImage))
            }
          >
            <Image
              src="/Close Small Icon.svg"
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