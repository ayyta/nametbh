"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import supabaseAnon from "@/lib/supabaseAnonClient";

// Wrapper that redirects to login if user is not authenticated
export default function AuthCheckWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabaseAnon.auth.getSession();
      console.log("session", session);
      // Skip redirect if user is on login or register page
      if (!session && (pathname !== "/login" && pathname !== "/register")) {
        router.push("/login");
      } 
      else if (session && (pathname === "/login" || pathname === "/register")) {
        router.push("/home");
      }
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        {/* Add your loading spinner or any loading UI here */}
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      {children}
    </div>
  )
}

