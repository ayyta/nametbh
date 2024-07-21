import Link from "next/link"
import Image from "next/image";

export default function Navbar() {

  const imageStyle = {
    borderRadius: '50',
    border: '1px solid #fff',
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-link">
        <Image 
          src="/Home.svg"
          width={200}
          height={200}
          style={imageStyle}
          alt="Home logo"
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