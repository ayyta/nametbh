"use client";

import React, { useState, useEffect, forwardRef } from 'react';
import PostCardPreview from '@/components/post-card/post-card-preview/page';
import supabaseAnon from '@/lib/supabaseAnonClient';
import { useAuth } from '@/components/wrappers/AuthCheckWrapper';

const Component = ({
  pageType = "profile", // home, profile, friends
}) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  // useEffect( () => {
  //   const checkAuth = async () => {
  //     const { 
  //         data: { session }
  //       } = await supabaseAnon.auth.getSession();
  //     setUser(session?.user || null);
  //   }
  //   checkAuth();
  // }, [])
  useEffect(() => {
    const fetchPosts = async () => {
      const { 
        data: { session } 
      } = await supabaseAnon.auth.getSession();
      console.log(session)
      const response = await fetch(`/api/posts/${pageType}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.access_token}`, // Send the auth token
        },
      });
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      //setPosts(data);
    }
    fetchPosts();
  },  [])
  return (
    <div className="flex flex-col">
      <PostCardPreview 
        postId={70}
        username={user.email}
        userId={user.id}
      />
      <PostCardPreview 
        postId={80}
        username={user.email}
        userId={user.id}
      />
    </div>

  )
}


export default Component;
