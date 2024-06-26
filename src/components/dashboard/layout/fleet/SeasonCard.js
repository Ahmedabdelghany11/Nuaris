import deleteIcon from "../../../../assets/images/delete.svg";
import { Calendar, DateObject } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const SeasonCard = ({ formData, setFormData, index }) => {
  let optionsArray = [];
  const currentCard = formData?.season_prices[index];
  const [initialDates, setInitialDates] = useState([]);

  useEffect(() => {
    if (currentCard?.dates) {
      setInitialDates(
        currentCard.dates.map((e) => [
          new DateObject().set({
            year: Number(e?.from?.split("/")[0]),
            month: Number(e?.from?.split("/")[1]),
            day: Number(e?.from?.split("/")[2])
          }),
          new DateObject().set({
            year: Number(e?.to?.split("/")[0]),
            month: Number(e?.to?.split("/")[1]),
            day: Number(e?.to?.split("/")[2])
          })
        ])
      );
    }
  }, [currentCard]);

  function handleDeleteSeasonCard() {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      season_prices.splice(index, 1);
      return {
        ...prev,
        season_prices
      };
    });
  }

  function handleChangeSeasonPrice(e, i) {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      season_prices[i][e.target.name] = e.target.value;
      return {
        ...prev,
        season_prices
      };
    });
  }

  if (currentCard.period_type === "minutes") {
    optionsArray = ["15", "30", "45"];
  } else if (currentCard.period_type === "hours") {
    optionsArray = Array(12)
      .fill(1)
      .map((e, i) => i + 1);
  } else if (currentCard.period_type === "days") {
    optionsArray = Array(31)
      .fill(1)
      .map((e, i) => i + 1);
  } else if (currentCard.period_type === "weeks") {
    optionsArray = Array.from({ length: 51 }, (_, i) => i + 2);
  } else if (currentCard.period_type === "months") {
    optionsArray = Array(12)
      .fill(1)
      .map((e, i) => i + 1);
  }

  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <div className="row m-0">
          <div className="col-lg-6 col-12 p-2">
            <CustomInputField
              hint={"( Minimum 50% )"}
              label={"Advanced Payment percentage"}
              name="prepaymentPercentage"
              type="number"
              placeholder="00"
              value={formData?.advanced_payment_percentage}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  advanced_payment_percentage: e.target.value
                }));
              }}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="period">Minimum Rental Period</label>
              <div className="time-units">
                <select
                  className="units w-100"
                  name="period"
                  id="min_booking_time_type"
                  value={currentCard.period}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                >
                  {optionsArray.map((minit, index) => (
                    <option key={index} value={minit}>
                      {minit}
                    </option>
                  ))}
                </select>
                <select
                  className="units"
                  name="period_type"
                  id="units"
                  value={currentCard.period_type}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                >
                  {["minutes", "hours", "days", "weeks", "months"].map(
                    (unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="d-flex gap-3 p-2">
            <div className="p-0">
              <Calendar
                value={initialDates}
                onChange={(dates) => {
                  const updatedSeasonPrices = [...formData?.season_prices];
                  updatedSeasonPrices[index].dates = dates.map((dateRange) => {
                    if (dateRange[0] && dateRange[1]) {
                      return {
                        from: dateRange[0].format("YYYY/MM/DD"),
                        to: dateRange[1].format("YYYY/MM/DD")
                      };
                    }
                    return null;
                  });
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    season_prices: updatedSeasonPrices
                  }));
                }}
                multiple
                range
                plugins={[<DatePanel />]}
              />
            </div>
            <div className="row m-0">
              {/* Minimum rental period */}
              <div className="col-12 p-0 pb-2">
                <div className="input-field">
                  <label htmlFor="period">Booking Time</label>
                  <div className="time-units">
                    <select
                      className="units w-100"
                      name="period"
                      id="min_booking_time_type"
                      value={currentCard.period}
                      onChange={(e) => handleChangeSeasonPrice(e, index)}
                    >
                      {optionsArray.map((minit, index) => (
                        <option key={index} value={minit}>
                          {minit}
                        </option>
                      ))}
                    </select>
                    <select
                      className="units"
                      name="period_type"
                      id="units"
                      value={currentCard.period_type}
                      onChange={(e) => handleChangeSeasonPrice(e, index)}
                    >
                      {["minutes", "hours", "days", "weeks", "months"].map(
                        (unit, index) => (
                          <option key={index} value={unit}>
                            {unit}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
              {/* Price */}
              <div className="col-12 p-2 pe-0 ps-0">
                <CustomInputField
                  name={"price"}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                  value={currentCard.price}
                  label={"Price"}
                  placeholder="00"
                />
              </div>
              {/* Extra Hour price */}
              <div className="col-lg-6 col-12 p-2 pe-lg-2 ps-0 pb-0">
                <CustomInputField
                  name="extra_hour_price"
                  label={`Extra ${currentCard.period} ${currentCard.period_type} Price`}
                  placeholder="00"
                  type="number"
                  value={currentCard.extra_hour_price}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                />
              </div>
              {/* Extra Hour price */}
              <div className="col-lg-6 col-12 p-2 pe-0 ps-0 pb-0">
                <CustomInputField
                  name="minimum_price"
                  label={"Minimum Price"}
                  placeholder="00"
                  type="number"
                  value={currentCard.minimum_price}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={formData?.season_prices.length === 1}
          style={{
            opacity: formData?.season_prices.length === 1 ? "0.5" : "1"
          }}
          type="button"
          className="delete_btn"
          onClick={handleDeleteSeasonCard}
        >
          <img src={deleteIcon} alt="deleteIcon" />
        </button>
      </div>
    </div>
  );
};

export default SeasonCard;
