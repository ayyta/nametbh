import Link from "next/link"
import Image from "next/image";

export default function Navbar() {

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-upper-section">
          <div className="sidebar-link-container">
            <Link href="/" className="sidebar-link">
              <div className="sidebar-link-image">
                <Image 
                  src="/Home Icon.svg"
                  width={44}
                  height={0}
                  alt="Home logo"
                />
              </div>
              <div className="sidebar-link-title">
                Home
              </div>
            </Link>
          </div>
          <div className="sidebar-link-container">
            <Link href="/" className="sidebar-link">
              <div className="sidebar-link-image">
                <Image 
                  src="/favorite.svg"
                  width={44}
                  height={0}
                  alt="Following logo"
                />
              </div>
              <div className="sidebar-link-title">
                Following
              </div>
            </Link>
          </div>
          <div className="sidebar-link-container">
            <Link href="/" className="sidebar-link">
              <div className="sidebar-link-image">
                <Image 
                  src="/Friends Icon.svg"
                  width={44}
                  height={0}
                  alt="Friends logo"
                />
              </div>
              <div className="sidebar-link-title">
                Friends
              </div>
            </Link>
          </div>
          <div className="sidebar-link-container">
            <Link href="/" className="sidebar-link">
              <div className="sidebar-link-image">
                <Image 
                  src="/Inbox.svg"
                  width={44}
                  height={0}
                  alt="Inbox logo"
                />
              </div>
              <div className="sidebar-link-title">
                Inbox
              </div>
            </Link>
          </div>
        </div>
        <div className="sidebar-lower-section">
          <div className="sidebar-link-container">
            <Link href="/" className="sidebar-link">
              <div className="sidebar-link-image">
                <Image 
                  src="/Plus square.svg"
                  width={44}
                  height={0}
                  alt="Upload logo"
                />
              </div>
              <div className="sidebar-link-title">
                Upload
              </div>
            </Link>
          </div>
          <div className="sidebar-link-container avatar-container">
            <div className="avatar-logo">
              <Image
                src="/Generic avatar.svg"
                width={44}
                height={0}
                alt="Avatar logo"
              />
            </div>
            <div className="avatar-name-container">
              <div className="avatar-name">
                huge burger
              </div>
              <div className="avatar-handle">
                @hugeburger
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}