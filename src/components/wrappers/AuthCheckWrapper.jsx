'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { fetchUserProfile } from '@/components/FetchUserProfile';
import supabaseAnon from '@/lib/supabaseAnonClient';

const AuthContext = createContext();

// Wrapper that redirects to login if user is not authenticated
export default function AuthCheckWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabaseAnon.auth.getSession();

      // Skip redirect if user is on login or register page
      if (!session && pathname !== '/login' && pathname !== '/register') {
        router.push('/login');
        setLoading(true);
      } else if (
        session &&
        (pathname === '/login' || pathname === '/register')
      ) {
        router.push('/home');
        setLoading(true);
      } else {
        const fetchedUserProfile = await fetchUserProfile(session.user.id);
        const updatedUser = { ...session.user, ...fetchedUserProfile };
        setUser(updatedUser);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <div className="flex w-full h-full">
        {loading ? (
          <div className="flex w-full h-full items-center justify-center">
            <p className="text-xl text-white">Loading...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
