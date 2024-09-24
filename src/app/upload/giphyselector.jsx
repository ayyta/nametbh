import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function GiphySelector({ 
  gifs, 
  setGifs, 
  showGifs, 
  setShowGifs,
  showPopup,
  setShowPopup,
})

{

  if (!showPopup) return null;

  const closePopup = () => {
    setShowPopup(false);
    setShowGifs(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key : '7VGHs9vybY2b6EcUZtVi3ay9pVVlFOxu',
          limit : 24,
        }
      });
      console.log(results);
      setGifs(results.data.data);
    }
    fetchData();
  }, [showGifs]);
  // }, []);

  const renderGifs = () => {
    return gifs.map(giphy => {
      return (
        <div className="flex" key={giphy.id}>
          <Image 
            src={giphy.images.fixed_height.url}
            width={0}
            height={0}
            sizes='100vw'
            style={{
              "width" : "100%",
              "object-fit" : "cover",
            }}
            alt='Gif'
            className='rounded-lg'
          />
        </div>
      )
    });
  }


  return (
    <div className="flex fixed top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 border-4 border-solid border-primary/50 rounded-2xl bg-third max-h-161 z-20">
      <div className="absolute -top-12 left-1/2 -translate-y-2/4 -translate-x-2/4">
        <form className="flex items-center justify-center w-max rounded-full bg-slate-200">
          <div>
            <input 
              type="search" 
              placeholder="Search Gifs..." 
              className="flex bg-transparent text-lg text-primary p-3.5 focus:bg-slate-300 focus:rounded-full" 
            />
          </div>
          <div className="float-right ml-2 mr-2">
            <button 
              type="submit"
              className="flex bg-transparent"
            >
              GO
            </button>
          </div>
        </form>
      </div>
      <div className="scrollbar grid grid-cols-3 relative overflow-y-hidden overflow-y-scroll scroll-smooth">
        {showGifs && renderGifs()}
        <button 
          className='fixed -top-16 right-1.5 z-50 bg-slate-200 rounded-full hover:opacity-80 hover:bg-secondary active:opacity-50 cursor-pointer'
          onClick={closePopup}
        >
          <Image
            src="/Close Small Icon.svg"
            width={42}
            height={0}
            alt='Close logo'
          />
        </button>
      </div>
    </div>
  );
}