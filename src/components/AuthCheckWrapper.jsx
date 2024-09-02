"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import supabaseAnon from "@/lib/supabaseAnonClient";

// Wrapper that redirects to login if user is not authenticated
export default function AuthCheckWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabaseAnon.auth.getSession();

      // Skip redirect if user is on login or register page
      if (!session && (pathname !== "/login" && pathname !== "/register")) {
        router.push("/login");
      }
    }

    checkAuth();
  }, [router]);
  
  return (
    <div className="flex w-full h-full">
      {children}
    </div>
  )
}

