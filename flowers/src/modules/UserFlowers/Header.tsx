import flower from "../../assets/images/flower.jpg";

const Header = () => {
  return (
    <div className="header-box">
      <div className="user-box3">
        <img className="user-box3__profile-pic" src={flower} />
        <div className="user-box3__user">
          <p className="user-box3__user__name">Name LastName</p>
          <p className="user-box3__user__sightings">sightings</p>
        </div>
      </div>
      <button className="report-button">Report</button>
    </div>
  );
};

export default Header;
