import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "../state/state";
import { useEffect } from "react";
import Post from "./Post";

const Posts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getFeedPosts = async () => {
    const response = await fetch("http://localhost:3003/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3003/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getFeedPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          userPicturePath,
          location,
          description,
          postPicturePath,
          likes,
          comments,
        }) => (
          <Post 
            key={_id}
            postId={_id}
            postUserId={userId}
            firstName={firstName}
            lastName={lastName}
            location={location}
            userPicturePath={userPicturePath}
            description={description}
            postPicturePath={postPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default Posts;
