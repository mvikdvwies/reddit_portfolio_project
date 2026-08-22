//поиск постов
//searchQuery - значение поиска
//setSearchQuery - функция для установки значения поиска
export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <input
        type="search"
        placeholder="Search posts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
