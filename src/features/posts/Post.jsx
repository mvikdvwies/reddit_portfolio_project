import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
    </div>
  );
}
