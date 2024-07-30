'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {

  // const [isBold, setIsBold] = useState(0);
  const [selectedItem, setSelectedItem] = useState('Home')


  function handleClick(item) {
    // 
    const lastItem = selectedItem;
    setSelectedItem(item);

    // unbold lastItem
    // apply bold to new item
  }

  let navbarItems = [
    {
      'name': "Home", 
      "link": "/"
    },
    {
      "name": "Following",
      "link": "/following"
    },
    {
      "name": "Friends",
      "link": "/friends"
    },
    {
      "name": "Inbox",
      "link": "/inbox"
    },
    {
      "name": "Upload",
      "link": "/upload"
    }
  ];

  const NavItem = ({item, index}) =>  {
    const {name, link, image, alt} = item;
    return (
      <>
        <div className="sidebar-link-container" onClick={(e) => changePage(e, index)}>
          <Link href={link} className="sidebar-link" onClick={() => {
              handleClick("Home")
            }}>
            <div className="sidebar-link-image">
              <Image 
                src="/Home Icon.svg"
                width={44}
                height={0}
                alt="Home logo"
              />
            </div>
            <div className={`sidebar-link-title 
              ${activeIndex === index ? 'font-bold' : 'font-normal'}`
            }>
              Home
            </div>
          </Link>
        </div>
      </>
    )
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-upper-section">
          {navbarItems.map((value, index) => {
            <NavItem item={value} index={index}/>
          })}
          <div className="sidebar-link-container">
            <Link href="/" className="sidebar-link" onClick={() => {
                handleClick("Home")
              }}>
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
            <Link href="/following" className="sidebar-link">
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
            <Link href="/friends" className="sidebar-link">
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
            <Link href="/inbox" className="sidebar-link">
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
            <Link href="/upload" className="sidebar-link">
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
            <Link href="/profile" className="sidebar-link">
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
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}