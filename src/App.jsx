import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedSwitcher from "./features/posts/FeedSwitcher";
import {
  fetchStories,
  selectFeedType,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from "./features/posts/postsSlice";
import "./index.css";

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
      <FeedSwitcher
        feedType={feedType}
        onSelectFeed={(feedType) => dispatch(fetchStories(feedType))}
      />
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
