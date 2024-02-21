import { Link } from "react-router-dom";
import locationIcon from "../../../../assets/images/pin.svg";
import passengersIcon from "../../../../assets/images/crowd.svg";
import captainIcon from "../../../../assets/images/captain.svg";
import Badge from "../../../ui/Badge";
import fleetImage from "../../../../assets/images/fleet.png";

export default function FleetCard({ fleet }) {
  return (
    <article className="fleet-card">
      <Badge state={1} content={fleet?.state || "available"} />

      <Link to={fleet?.id || ""} className="image-container">
        <img
          loading="lazy"
          className="fleet_image"
          src={fleetImage}
          alt="flee"
        />
      </Link>

      <div className="card-content">
        <h3>{fleet?.fleetName || "Santa Maria"}</h3>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" />{" "}
          {fleet?.location || "Riyadh, Saudi Arabia"}
        </p>
        <p className="card-location">
          <img src={passengersIcon} alt="location pin" />{" "}
          {fleet?.maxPassengers || "25"}
        </p>
        <p className="card-location">
          <img src={captainIcon} alt="location pin" /> Crew ({" "}
          {fleet?.crewSize || "8"} )
        </p>
        <p className="card-location">
          <img src={locationIcon} alt="location pin" /> {fleet?.price || "100"}$
          {(fleet?.pricePer && <span>/ {fleet?.pricePer}</span>) || (
            <span>/ hour</span>
          )}
        </p>
      </div>
    </article>
  );
}