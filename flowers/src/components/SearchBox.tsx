import searchIcon from "../assets/images/search.svg";

const SearchBox: React.FC = () => {
    return (
        <div className="searchBox">
            <input type="text" placeholder="Looking for something specific?" />
            <button className="searchButton">
                <img src={searchIcon} alt="Search" />
            </button>
        </div>
    );
}

export default SearchBox;