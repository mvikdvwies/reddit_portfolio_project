import "./Post.css";

export default function Post({ post }) {
  return (
    <article className="post">
      <a
        href={post.url || `https://news.ycombinator.com/item?id=${post.id}`}
        target="_blank" //открывает ссылку в новой вкладке
        rel="noopener noreferrer" //предотвращает атаки типа clickjacking
        className="post-link" //стили для ссылки
      >
        {post.title}
      </a>
      {/* метаданные поста */}
      <p className="post-meta">
        {/*очки и автор*/}
        {post.score} points | by {post.by} |{" "}
        {/*время публикации в локальном формате*/}
        {new Date(post.time * 1000).toLocaleString()}{" "}
      </p>
    </article>
  );
}
