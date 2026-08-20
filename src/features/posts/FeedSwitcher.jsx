import "./FeedSwitcher.css";

export default function FeedSwitcher({ feedType, onSelectFeed }) {
  return (
    <div>
      <button
        className={feedType === "top" ? "active" : "button"}
        onClick={() => onSelectFeed("top")}
      >
        Top
      </button>

      <button
        className={feedType === "new" ? "active" : "button"}
        onClick={() => onSelectFeed("new")}
      >
        New
      </button>

      <button
        className={feedType === "best" ? "active" : "button"}
        onClick={() => onSelectFeed("best")}
      >
        Best
      </button>
    </div>
  );
}
