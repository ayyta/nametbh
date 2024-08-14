'use client';
import { useRouter } from "next/navigation";
import NavBar from "./NavBar.jsx";

export default function NavBarWrapper() {
  const router = useRouter();
  console.log("in wrapper", router.pathname)
  return (
    <>
      {router.pathname !== "/login" && router.pathname !== "/register" && <NavBar />}
    </>
  );
}