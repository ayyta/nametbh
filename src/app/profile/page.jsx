"use client";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    signOut(router);
  }
  return (
    <main>
      <h1>
        Profile Page
      </h1>
      <button className="w-24 h-12 bg-white" onClick={handleLogout}>
        Logout
      </button>
    </main>
  )
}