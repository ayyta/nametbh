"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import supabaseAnon from "@/lib/supabaseAnonClient";

// Wrapper that redirects to login if user is not authenticated
export default function AuthCheckWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabaseAnon.auth.getSession();

      // Skip redirect if user is on login or register page
      if (!session && (pathname !== "/login" && pathname !== "/register")) {
        router.push("/login");
        setLoading(true);

      } 
      else if (session && (pathname === "/login" || pathname === "/register")) {
        router.push("/home");
        setLoading(true);

      } else {
        setUser(session?.user || null);
        setLoading(false);
      }
    }

    checkAuth();
  }, [router, pathname]);

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

