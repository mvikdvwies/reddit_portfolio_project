import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopStories,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from "./features/posts/postsSlice";

export default function App() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchTopStories());
  }, [dispatch]);

  return (
    <div>
      <h1>Hacker News Client</h1>
      {postsStatus === "loading" && <div>Loading...</div>}
      {postsStatus === "succeeded" && (
        <div>
          {posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      )}
      {postsStatus === "failed" && <div>Error: {postsError}</div>}
      {postsStatus === "failed" && (
        <button onClick={() => dispatch(fetchTopStories())}>Retry</button>
      )}
    </div>
  );
}
