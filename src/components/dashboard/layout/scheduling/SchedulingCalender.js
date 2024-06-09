import React from "react";
import Calender from "./Calender";

const SchedulingCalender = () => {
  return (
    <div className="bg_white_card">
      <div className="m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Scheduling</h6>
        </div>
        <div className="col-12 p-2">
          <Calender />
        </div>
      </div>
    </div>
  );
};

export default SchedulingCalender;
