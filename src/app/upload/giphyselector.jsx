'use client';
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
  const [searchGif, setSearchGif] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Closes the Giphy popup
  const closePopup = () => {
    setShowPopup(false);
    setShowGifs(false);
  };

  // Fetches the gifs from the Giphy API
  const fetchData = async (searchVal = '') => {
    setIsLoading(true);

    try {
      const endpoint = searchVal ? `https://api.giphy.com/v1/gifs/search` : 'https://api.giphy.com/v1/gifs/trending';

      const results = await axios(endpoint, {
        params: {
          api_key : `7VGHs9vybY2b6EcUZtVi3ay9pVVlFOxu`,
          limit : 30,
        }
      })
      setGifs(results.data.data);
    } catch (error) {
      console.error("Error fetching gifs", error);
    }
  };

  // Handles the user search change
  const handleSearchChange = (e) => {
    const searchVal = e.target.value;
    setSearchGif(searchVal);
    fetchData(searchVal);
  };

  // Whenever the user searches for a gif, it will fetch the data
  useEffect(() => {
    fetchData();
  }, []);

  // Handles the user search submission and gets the data they searched for
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key : '7VGHs9vybY2b6EcUZtVi3ay9pVVlFOxu',
          q : searchGif,
        }
      });
      setGifs(results.data.data);
    } catch (error) {
      console.error("Error fetching gifs", error);
    }
  };

  // Renders the gifs
  const renderGifs = () => {
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

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
  };

  if (!showPopup) return null;

  return (
    <div className="flex fixed top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 border-4 border-solid border-primary/50 rounded-2xl bg-third max-h-161 z-20">
      <div className="absolute -top-12 left-1/2 -translate-y-2/4 -translate-x-2/4">
        <form 
          className="flex items-center justify-center w-max rounded-full bg-slate-200"
        >
          <div alt="Search Bar">
            <input 
              value={searchGif}
              onChange={handleSearchChange}
              type="search" 
              placeholder="Search Gifs..." 
              className="flex bg-transparent text-lg text-primary p-3.5 focus:bg-slate-300 focus:rounded-full" 
            />
          </div>
          <div className="float-right ml-2 mr-2">
            <button 
              type="submit"
              className="flex p-2 hover:rounded-full hover:bg-slate-300 active:opacity-50 active:bg-slate-400 cursor-pointer"
              onClick={handleSearchSubmit}
            >
              <Image
                src="/Search Icon.svg"
                width={28}
                height={0}
                alt='Search logo'
              />
            </button>
          </div>
        </form>
      </div>
      <div alt="Gif Close Button">
        <button
          className='fixed -top-16 right-3.5 z-50 bg-slate-200 rounded-full hover:bg-slate-300 active:opacity-50 cursor-pointer'
          onClick={closePopup}
        >
          <Image
            src="/Close Small Icon.svg"
            width={38}
            height={0}
            alt='Close logo'
          />
        </button>
      </div>
      <div className="gif-scrollbar grid grid-cols-3 relative overflow-y-hidden overflow-y-scroll scroll-smooth">
        {showGifs && renderGifs()}
      </div>
    </div>
  );
}