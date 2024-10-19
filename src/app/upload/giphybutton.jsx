import Image from 'next/image';

export default function GiphyButton({ 
  showGifs, 
  setShowGifs, 
  showPopup, 
  setShowPopup 
})

{

  const handleGiphy = () => {
    setShowGifs(!showGifs);
    setShowPopup(true);
  }

  return (
    <button 
      className="upload-utilities"
      onClick={handleGiphy}
    >
      <Image
        src="/Gif Icon.svg"
        width={28}
        height={0}
        alt="Giphy logo"
      />
    </button>
  );
}