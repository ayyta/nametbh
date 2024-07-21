import Link from "next/link"

export default function Navbar() {

  return (
    <nav className="sidebar">
      <div className="sidebar-link">
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