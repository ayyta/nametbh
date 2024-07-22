import Link from "next/link"
import Image from "next/image";

export default function Navbar() {

  return (
    <nav className="sidebar">
      <div className="sidebar-link">
        <Image 
          src="/Home.svg"
          width={44}
          height={0}
          alt="Home logo"
          className="sidebar-link-image"
        />
        <Link href="/">
          Home
        </Link>
      </div>
      <div className="sidebar-link">
        <Link href="/following">
          Following
        </Link>
      </div>
    </nav>
  );
}