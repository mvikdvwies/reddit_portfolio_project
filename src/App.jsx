import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStories,
  selectFeedType,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from "./features/posts/postsSlice";

export default function App() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);
  //читает из redux store тип ленты
  const feedType = useSelector(selectFeedType);

  useEffect(() => {
    dispatch(fetchStories("top"));
  }, [dispatch]);

  return (
    <div>
      <h1>Hacker News Client</h1>
      <button onClick={() => dispatch(fetchStories("top"))}>Top</button>
      <button onClick={() => dispatch(fetchStories("new"))}>New</button>
      <button onClick={() => dispatch(fetchStories("best"))}>Best</button>
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
        <button onClick={() => dispatch(fetchStories(feedType))}>Retry</button>
      )}
    </div>
  );
}
