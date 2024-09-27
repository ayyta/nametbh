import { useState } from 'react';
import PostCardPreview from '@/components/post-card/post-card-preview';
import PostCardCarousel from "@/components/post-card/post-card-carousel"

// import PostCardView from '@/components/post-card/post-card-view';

const Component = () => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const openCarousel = () => {
    setIsCarouselOpen(true)
  }

  const closeCarousel = () => {
    setIsCarouselOpen(false)
  }

  const images = ["/massageServices.jpg", "/haircut2.jpg", "/massageServices.jpg", "/haircut2.jpg"] 

  return (
    <>
      {isViewOpen ? null : 
      <PostCardPreview         
        openCarousel={openCarousel}
      />}
      {/* <PostCardView/> */}
      <PostCardCarousel 
        images={images} 
        isCarouselOpen={isCarouselOpen} 
        closeCarousel={closeCarousel}
      />
    </>
  )
}


export default Component;