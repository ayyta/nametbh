"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Header from "@/app/post/[postid]/header";
import PostCardPreview from "@/components/post-card/post-card-preview/page";
import SortByDropDown from "@/app/post/[postid]/sort-by-dropdown";
import Loading from "@/components/Loading";

const Component = ({  
  params,
  postId=params.postid,
  userId=null,
  pfp = "/placeholder-avatar.jpg",
  name = "John Doe",
  username = "@johndoe",
  bio="some bio",
  following_count=0,
  follower_count=0,
  followsYou=false,
  following=false, 
  friends=false,
  creationDate = "2h ago",
  content = "This is a sample post content. It can be much longer and will wrap to multiple lines if needed. ",
  images = ["/massageServices.jpg", "/haircut2.jpg", "/massageServices.jpg", "/haircut2.jpg"]
}) => {
  // post table: post_id, created_at, user_id, like_count, comment_count, share_count, text_content
  // user_table: name, email, username, pfp, profile_background, bio
  // backend: given pfp media_id from user_table, get media_url from media_table
  // match media id with post_id in media_post table to get all media urls for post

  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Newest", value: "newest" },
    { label: "Most Liked", value: "most_liked" },
  ]

  const router = useRouter();
  
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);


  // Dropdown menu, change replies based on selected sort
  useEffect(() => {
    console.log("Selected sort: ", selectedSort);
  }, [selectedSort]);

  return (
    <div className="w-full h-full relative flex flex-col items-center overflow-y-scroll	">
      <div className="w-192 ">
        <Header router={router} title={"Note"}/>

        {/* Content */}
        <PostCardPreview images={[]}/>
        <div className="w-full flex flex-row items-center justify-between p-4 border-y border-white/50">
          <p className="text-white font-bold text-lg ">Replies</p>
          <SortByDropDown 
            sortOptions={sortOptions} 
            selectedSort={selectedSort} 
            setSelectedSort={setSelectedSort}
          />
        </div>

        <Replies postId={postId} selectedSort={selectedSort}/>

      </div>

    </div>
  );
};

const Replies = ({
  postId="",
  selectedSort={ label: "Relevance", value: "relevance" }
}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [replies, setReplies] = useState([]);
  
  useEffect(() => {
    setReplies([
      {
        postId: 1,
        userId: "122",
        pfp: "/placeholder-avatar.jpg",
        name: "John Doe",
        username: "@johndoe",
        bio: "some bio",
        following_count: 0,
        follower_count: 0,
        followsYou: false,
        following: false, 
        friends: false,
        creationDate : "2h ago",
        content : "This is a sample post content. It can be much longer and will wrap to multiple lines if needed. ",
        images : [],
        likeCount: 1700,
        commentCount: 2500,
        shareCount: 1000000,
        replies: [{
          postId: 2,
          userId: "123",
          pfp: "/placeholder-avatar.jpg",
          name: "John Doe",
          username: "@johndoe",
          bio: "some bio",
          following_count: 0,
          follower_count: 0,
          followsYou: false,
          following: false, 
          friends: false,
          creationDate : "2h ago",
          content : "This is a sample post content. second post ",
          images : ["/massageServices.jpg", "/haircut2.jpg"],
          likeCount: 1000,
          commentCount: 2000,
          shareCount: 5000,
        },{
          postId: 3,
          userId: "123",
          pfp: "/placeholder-avatar.jpg",
          name: "John Doe",
          username: "@johndoe",
          bio: "some bio",
          following_count: 0,
          follower_count: 0,
          followsYou: false,
          following: false, 
          friends: false,
          creationDate : "2h ago",
          content : "This is a sample post content. second post ",
          images : ["/massageServices.jpg"],
          likeCount: 1000,
          commentCount: 2000,
          shareCount: 5000,
        }]
      }, {
      postId: 1,
        userId: "122",
        pfp: "/placeholder-avatar.jpg",
        name: "John Doe",
        username: "@johndoe",
        bio: "some bio",
        following_count: 0,
        follower_count: 0,
        followsYou: false,
        following: false, 
        friends: false,
        creationDate : "2h ago",
        content : "This is a sample post content. It can be much longer and will wrap to multiple lines if needed. ",
        images : [],
        likeCount: 1700,
        commentCount: 2500,
        shareCount: 1000000,
        replies: [],
      }
    ])
    setIsLoading(false)
  }, []);

  // If no replies, show message
  if (replies.length === 0 && !isLoading) {
    return (
      <div className="w-full h-64 flex justify-center items-center text-white text-lg font-bold">
        Oops... looks a little quiet here, be the first to reply!
      </div>
    )
  }

  // If replies, show replies
  return (
    <>
      {isLoading ? (
        <div className="relative w-full h-64 flex justify-center items-center">
          <Loading/>
        </div>
      ) : (
        replies.map((reply, index) => (
          <div key={index}>
            <PostCardPreview
              key={reply.postId}
              postId={reply.postId}
              userId={reply.userId}
              pfp={reply.pfp}
              name={reply.name}
              username={reply.username}
              bio={reply.bio}
              following_count={reply.following_count}
              follower_count={reply.follower_count}
              followsYou={reply.followsYou}
              following={reply.following}
              friends={reply.friends}
              creationDate={reply.creationDate}
              content={reply.content}
              images={reply.images}
              likeCount={reply.likeCount}
              commentCount={reply.commentCount}
              shareCount={reply.shareCount}
              hasReplies={reply.replies && reply.replies.length > 0}
            />
            {reply.replies.length > 0 && (
              reply.replies.map((nestedReply, index) => (
                <PostCardPreview
                  key={nestedReply.postId}
                  postId={nestedReply.postId}
                  userId={nestedReply.userId}
                  pfp={nestedReply.pfp}
                  name={nestedReply.name}
                  username={nestedReply.username}
                  bio={nestedReply.bio}
                  following_count={nestedReply.following_count}
                  follower_count={nestedReply.follower_count}
                  followsYou={nestedReply.followsYou}
                  following={nestedReply.following}
                  friends={nestedReply.friends}
                  creationDate={nestedReply.creationDate}
                  content={nestedReply.content}
                  images={nestedReply.images}
                  likeCount={reply.likeCount}
                  commentCount={reply.commentCount}
                  shareCount={reply.shareCount}
                  hasReplies={reply.replies && reply.replies.length-1 > index}
                />
              ))
            )}
          </div>
        ))
      )}

    </>
  )
}

export default Component;