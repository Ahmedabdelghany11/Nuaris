import React, { useState } from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const WorkingTime = ({ setForm }) => {
  const [loading] = useState(false);
  const handleNext = (e) => {
    e.preventDefault();
    setForm("Prices");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };
  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Working Time</h6>
        </div>

        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkingTime;
