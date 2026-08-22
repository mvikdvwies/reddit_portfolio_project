import Post from "./Post";

export default function PostsList({
  postsStatus,
  posts,
  postsError,
  onRetry,
  searchQuery,
}) {
  if (postsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (postsStatus === "failed") {
    return (
      <div>
        <div>Error: {postsError}</div>;<button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  return (
    //если получили вдруг null или undefined, то фильтруем их чтобы
    //не упало приложение
    <div>
      {posts
        .filter(Boolean)
        .filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
}
