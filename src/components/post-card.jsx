"use client";

import React, { useState, forwardRef } from 'react';
import PostCardPreview from '@/components/post-card/post-card-preview/page';

const Component = () => {
  return (
    <div className="flex flex-col">
      <PostCardPreview postId={10}/>
      <PostCardPreview postId={80}/>
    </div>

  )
}


export default Component;
