import svg from "../assets/images/settings.svg";
import MySlider from "./MySlider";
import MySwitch from "./MySwitch";

const Settings: React.FC = () => {
  return (
    <div className="settings">
      <div className="settings__first">
        <div className="settings__first__heading">
          <p className="settings__first__heading--name">Settings</p>
          <span>
            <img
              className="settings__first__heading--svg"
              src={svg}
              alt="icon"
            />
          </span>
        </div>
        <div className="settings__first__notifications">
          <MySwitch />
        </div>
      </div>
      <hr className="settings__line"></hr>
      <div className="settings__second">
        <p className="settings__second--text">
          Select favorite flower sightings radious for notifications
        </p>
        {/* <span className="settings__second--distance">1 5 10</span> */}
        <MySlider />
      </div>
      <div className="settings__button">
        <button className="red-button">Save settings</button>
      </div>
    </div>
  );
};

export default Settings;
