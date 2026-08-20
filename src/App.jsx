import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedSwitcher from "./features/posts/FeedSwitcher";
import Post from "./features/posts/Post";
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
  }, [dispatch]); //загружаем ленту при загрузке компонента

  return (
    <div>
      <FeedSwitcher
        feedType={feedType} //передаем тип ленты
        onSelectFeed={(feedType) => dispatch(fetchStories(feedType))} //передаем функцию на выбор ленты
      />
      {postsStatus === "loading" && <div>Loading...</div>}
      {postsStatus === "succeeded" && (
        <div>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
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
