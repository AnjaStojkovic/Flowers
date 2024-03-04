import MapComponent from "../../components/Map";
import SightingForm from "../../components/Forms/SightingForm";

const AddSighting: React.FC = () => {
  return (
    <>
      <div className="map">
        <MapComponent />
        <div className="map__buttons">
          <button className="red-button">View on Google Maps</button>
        </div>
      </div>
      <div className="add-box">
        <div className="add-box__sighting-heading">
          <h1 className="add-box__sighting-heading--first">Add New Sighting</h1>
          <h2 className="add-box__sighting-heading--second">
            Explore between more than 8,427 sightings
          </h2>
        </div>
        <SightingForm />
      </div>
    </>
  );
};

export default AddSighting;
