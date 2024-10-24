import Image from "next/image";

export default function ReplyUtilities() {
  return (
    <>
      <button className="p-1.5 hover:opacity-80 hover:rounded-full hover:bg-third active:opacity-50 cursor-pointer">
        <Image 
          src="/Video Icon.svg"
          width={28}
          height={0}
          alt="Media logo"
        />
      </button>
      <button className="p-1.5 hover:opacity-80 hover:rounded-full hover:bg-third active:opacity-50 cursor-pointer">
        <Image 
          src="/Mic Icon.svg"
          width={28}
          height={0}
          alt="Mic logo"
        />
      </button>
      <button className="p-1.5 hover:opacity-80 hover:rounded-full hover:bg-third active:opacity-50 cursor-pointer">
        <Image 
          src="/Gif Icon.svg"
          width={28}
          height={0}
          alt="Giphy logo"
        />
      </button>
    </>
  );
}