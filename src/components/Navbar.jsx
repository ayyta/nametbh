'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Upload from "../app/upload/page";
import "../styles/Navbar.css";
export default function Navbar() {

  let navbarItems = [
    {
      "name": "Home", 
      "link": "/home",
      "image": {
        "nonfill": "/Home Icon.svg",
        "fill": "/Home Icon Fill.svg"
      },
    },
    {
      "name": "Following",
      "link": "/following",
      "image": {
        "nonfill": "/Following Icon.svg",
        "fill": "/Following Icon Fill.svg"
      },
    },
    {
      "name": "Friends",
      "link": "/friends",
      "image": {
        "nonfill": "/Friends Icon.svg",
        "fill": "/Friends Icon Fill.svg"
      },
    },
    {
      "name": "Inbox",
      "link": "/inbox",
      "image": {
        "nonfill": "/Inbox Icon.svg",
        "fill": "/Inbox Icon Fill.svg"
      },
    },
  ];

  /** Our Nav Component that renders the bold and filled in icons on the nav when active.
  */
  function Nav() {
    const [activeIndex, setActiveIndex] = useState(null);

    const changePage = (e, index) => {
      setActiveIndex(index);
    };

    return navbarItems.map((value, index) => {
      return (
        <>
          <Link href={value.link}>
              <div
                className="sidebar-link-container"
                key={index}
                style={{ fontWeight: activeIndex === index ? 700 : 400 }}
                onClick={(e) => changePage(e, index)}
              >
                <div className="sidebar-link">
                  <div className="sidebar-link-image">
                    <Image 
                      src={activeIndex === index ? value.image.fill : value.image.nonfill}
                      width={44}
                      height={0}
                      alt="Logo"
                    />
                  </div>
                  <div className="sidebar-link-title">
                    {value.name}
                  </div>
                </div>
              </div>
          </Link>
        </>
      );
    });
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-upper-section">
          <Nav />
        </div>
        <div className="sidebar-lower-section">
          <Link href="/upload">
            <button 
              onClick={() => setIsOpen(true)}
              className="sidebar-link-container"
            >
              <div className="sidebar-link">
                <div className="sidebar-link-image">
                  <Image 
                    src="/Upload Icon.svg"
                    width={44}
                    height={0}
                    alt="Upload logo"
                  />
                </div>
                <div className="sidebar-link-title">
                  Upload
                </div>
              </div>
            </button>
          </Link>
          <Upload 
            open={isOpen} 
            onClose={() => setIsOpen(false)} 
            // shouldCloseOnOverlayClick={false}
          />
          <div className="sidebar-link-container avatar-container">
            <Link href="/profile">
              <div className="sidebar-link">
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
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}