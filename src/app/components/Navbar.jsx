import Link from "next/link"
import Image from "next/image";

export default function Navbar() {

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-link">
          <Link href="/" className="sidebar-link-title">
            <Image 
              src="/Home.svg"
              width={44}
              height={0}
              alt="Home logo"
              className="sidebar-link-image"
            />
            Home
          </Link>
        </div>
        <div className="sidebar-link">
          <Link href="/following" className="sidebar-link-title">
            <Image
              src="/favorite.svg"
              width={44}
              height={0}
              alt="Following logo"
              className="sidebar-link-image"
            />
            Following
          </Link>
        </div>
        <div className="sidebar-link">
          <Link href="/friends" className="sidebar-link-title">
            <Image
              src="/Friends Icon.svg"
              width={44}
              height={0}
              alt="Friends logo"
              className="sidebar-link-image"
            />
            Friends
          </Link>
        </div>
        <div className="sidebar-link">
          <Link href="/inbox" className="sidebar-link-title">
            <Image
              src="/Inbox.svg"
              width={44}
              height={0}
              alt="Inbox logo"
              className="sidebar-link-image"
            />
            Inbox
          </Link>
        </div>
        <div className="sidebar-link">
          <Link href="/" className="sidebar-link-title">
            <Image 
              src="/Home.svg"
              width={44}
              height={0}
              alt="Home logo"
              className="sidebar-link-image"
            />
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}