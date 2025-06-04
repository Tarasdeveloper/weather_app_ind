export default function Search({ search, setSearch, handleSearch }) {
    return (
        <div className="searchEngine">
            <input
                type="text"
                className="citySearch"
                placeholder="Enter City Name"
                name="search"
                value={search}
                onChange={(evt) => setSearch(evt.target.value.toLowerCase())}
            />
            <button className="searchBtn" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}
