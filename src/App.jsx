import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedSwitcher from "./features/posts/FeedSwitcher";
import PostsList from "./features/posts/PostsList";
import {
  fetchStories,
  selectFeedType,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from "./features/posts/postsSlice";
import SearchBar from "./features/posts/SearchBar";
import "./index.css";

export default function App() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsStatus = useSelector(selectPostsStatus);
  const postsError = useSelector(selectPostsError);
  //читает из redux store тип ленты
  const feedType = useSelector(selectFeedType);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchStories("top"));
  }, [dispatch]); //загружаем ленту при загрузке компонента

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FeedSwitcher
        feedType={feedType} //передаем тип ленты
        onSelectFeed={(feedType) => dispatch(fetchStories(feedType))} //передаем функцию на выбор ленты
      />
      <PostsList
        postsStatus={postsStatus}
        posts={posts}
        postsError={postsError}
        feedType={feedType}
        onRetry={() => dispatch(fetchStories(feedType))}
        searchQuery={searchQuery}
      />
    </div>
  );
}
