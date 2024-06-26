import React, { useEffect, useState } from "react";
import PageHeader from "../../layout/shared/PageHeader";
import MainInfoForm from "../../layout/activites/MainInfoForm";
import Prices from "../../layout/activites/Prices";
import Policy from "../../layout/activites/Policy";
import WorkingHours from "../../layout/activites/WorkingHours";
import Location from "../../layout/activites/Location";
import { DAYS } from "../../../../constants";

const ActivitiesForm = () => {
  const [form, setForm] = useState("Main Info");
  const [isMainInfoValid, setIsMainInfoValid] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [isWorkingHoursValid, setIsWorkingHoursValid] = useState(false);
  const [isPricesValid, setIsPricesValid] = useState(false);

  const whatIsIncludedInitial = {
    item: "",
    quantity: ""
  };

  const [LocationPoint, setLocationPoint] = useState({
    lat: 24.7136,
    lng: 46.6753
  });

  const workingHoursInitial = DAYS.map((day, index) => {
    return {
      day,
      index,
      selected: false,
      hours: [{ from: "00:00", to: "00:00" }]
    };
  });

  const initialPricesData = {
    period: 30,
    period_type: "minutes",
    price: "",
    extra_hour_price: "",
    minimum_price: ""
  };

  const seasonCardInitialData = {
    period: "30",
    period_type: "minutes",
    advanced_payment_percentage: 100,
    price: "",
    extra_hour_price: "",
    minimum_price: "",
    dates: [new Date()]
  };

  const [formData, setFormData] = useState({
    images: Array(3).fill(""),
    video_link: "",
    name: "",
    category: "",
    description: "",
    capacity: "",
    quantity: "",
    what_included: [whatIsIncludedInitial],
    yacht: "",
    vat: null,
    restrictions: "",
    location_point: LocationPoint,
    location_name: "",
    working_hours: workingHoursInitial,
    advanced_payment_percentage: 100,
    minimum_rental_period: "30",
    minimum_rental_period_type: "minutes",
    prices: [initialPricesData],
    season_prices: [seasonCardInitialData]
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, location_point: LocationPoint }));
  }, [LocationPoint]);

  const handleFormChange = (newForm) => {
    const steps = [
      "Main Info",
      "Location",
      "Working hours",
      "Prices",
      "Policy"
    ];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Main Info" && isMainInfoValid) ||
        (form === "Location" && isLocationValid) ||
        (form === "Working hours" && isWorkingHoursValid) ||
        (form === "Prices" && isPricesValid) ||
        form === "Policy"
      ) {
        setForm(newForm);
      }
    }
  };

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Add New Activity" />
      </header>
      <div className="row m-0">
        <div className="addon_form_wrapper">
          <div className="wizard_tabs">
            {["Main Info", "Location", "Working hours", "Prices", "Policy"].map(
              (fo, i) => (
                <div
                  key={i}
                  className={`wizard_tab ${form === fo ? "active" : ""}`}
                  onClick={() => handleFormChange(fo)}
                >
                  <div className="step_no">{i + 1}</div>
                  <h6>{fo}</h6>
                </div>
              )
            )}
          </div>
          <div className="bg_white_card">
            {form === "Main Info" && (
              <MainInfoForm
                formData={formData}
                setFormData={setFormData}
                setForm={setForm}
                isValid={isMainInfoValid}
                setIsValid={setIsMainInfoValid}
                whatIsIncludedInitial={whatIsIncludedInitial}
              />
            )}
            {form === "Location" && (
              <Location
                setLocationPoint={setLocationPoint}
                setFormData={setFormData}
                formData={formData}
                LocationPoint={LocationPoint}
                setForm={setForm}
                isValid={isLocationValid}
                setIsValid={setIsLocationValid}
              />
            )}
            {form === "Working hours" && (
              <WorkingHours
                formData={formData}
                setFormData={setFormData}
                setForm={setForm}
                isValid={isWorkingHoursValid}
                setIsValid={setIsWorkingHoursValid}
              />
            )}
            {form === "Prices" && (
              <Prices
                formData={formData}
                seasonCardInitialData={seasonCardInitialData}
                initialPricesData={initialPricesData}
                setFormData={setFormData}
                setForm={setForm}
                isValid={isPricesValid}
                setIsValid={setIsPricesValid}
              />
            )}
            {form === "Policy" && <Policy setForm={setForm} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesForm;
