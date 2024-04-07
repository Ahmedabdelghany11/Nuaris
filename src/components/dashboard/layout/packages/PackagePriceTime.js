import React, { useState } from "react";
import { DAYS } from "../../../../constants";
import PricingAccordion from "./PricingAccordion";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";

const PackagePriceTime = ({ setForm }) => {
  const [loading, setLoading] = useState(false);
  const packageId = sessionStorage.getItem("package_id");
  const periodInitial = {
    start_date: "",
    end_date: "",
    price: "",
    price_type: "per person"
  };
  const formDataInitial = DAYS.map((day, index) => {
    return {
      day,
      periods: [periodInitial],
      selected: false,
      index
    };
  });
  const [formData, setFormData] = useState(formDataInitial);

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Package Info");
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);
    try {
      const filteredFormData = formData.filter((obj) => obj.selected === true);
      const reqData = filteredFormData.map((obj) => {
        return {
          day: obj.day,
          periods: obj.periods
        };
      });
      const dictionary = {
        trip_package_days: reqData
      };
      const response = await axios.patch(
        `/trip-packages/${packageId}/`,
        dictionary
      );
      if (response.status === 200) {
        toast.success("Package Time & Price Saved Successfully");
        setForm("Policy");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Time & Price</h6>
        </div>
        <div className="col-12 p-2">
          <PricingAccordion formData={formData} setFormData={setFormData} />
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
        </div>
      </div>
    </form>
  );
};

export default PackagePriceTime;
