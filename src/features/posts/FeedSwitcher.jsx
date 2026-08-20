import "./FeedSwitcher.css";

const feeds = ["top", "new", "best"]; /*массив типов лент*/

export default function FeedSwitcher({ feedType, onSelectFeed }) {
  return (
    <div className="feed-switcher">
      {feeds.map((feed) => (
        <button
          key={feed}
          onClick={() => onSelectFeed(feed)}
          className={feedType === feed ? "button active" : "button"} //если тип ленты равен текущей ленте, то добавляем класс active
        >
          {feed}
        </button>
      ))}
    </div>
  );
}
