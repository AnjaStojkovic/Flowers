import bg from "../../assets/images/flower-bg.png"
import SearchBox from "../../components/SearchBox";

const Background: React.FC = () => {
    return (
        <div>
            <p className="firstHeading">Discover flowers around you</p>
            <p className="secondHeading">Explore between more than 8.427 sightings</p>
            <SearchBox />
        </div>
    );
};

export default Background;