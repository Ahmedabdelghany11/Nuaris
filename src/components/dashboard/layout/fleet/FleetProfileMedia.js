import React from "react";
import MapCard from "../../../ui/map-modal/MapCard";
import FleetMediaSwiper from "../../layout/fleet/FleetMediaSwiper";

export default function FleetProfileMedia({ fleet }) {
  return (
    <React.Fragment>
      <div className="col-lg-5 col-12 p-2">
        <FleetMediaSwiper media={fleet.media} />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard />
      </div>
    </React.Fragment>
  );
}