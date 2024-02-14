import SearchBox from "../../components/SearchBox";

const Background: React.FC = () => {
    return (
        <div className="backgroundContainer">
            <p className="firstHeading">Discover flowers around you</p>
            <p className="secondHeading">Explore between more than 8.427 sightings</p>
            <SearchBox />
        </div>
    );
};

export default Background;