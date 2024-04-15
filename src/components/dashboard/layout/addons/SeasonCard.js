import deleteIcon from "../../../../assets/images/delete.svg";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import CustomInputWithUnit from "../../../ui/form-elements/CustomInputWIthUnit";
import CustomInputField from "../../../ui/form-elements/CustomInputField";

const SeasonCard = ({ formData, setFormData, index }) => {
  const currentCard = formData.season_prices[index];

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

  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <div className="p-2 ps-0">
          <Calendar
            value={currentCard.dates}
            onChange={(e) => {
              const dates = [...e];
              const timestampsArr = dates.map((e) =>
                e.map((e) => {
                  const timestamp = e.unix;
                  const dateObject = new Date(timestamp * 1000);
                  return `${dateObject.getFullYear()}/${String(
                    dateObject.getMonth() + 1
                  ).padStart(2, "0")}/${String(dateObject.getDate()).padStart(
                    2,
                    "0"
                  )}`;
                })
              );
              setFormData((prev) => {
                const season_prices = [...prev.season_prices];
                season_prices.splice(index, 1);
                return {
                  ...prev,
                  season_prices: [
                    ...season_prices,
                    {
                      ...currentCard,
                      dates: timestampsArr
                    }
                  ]
                };
              });
            }}
            multiple
            range
            plugins={[<DatePanel />]}
          />
        </div>
        <div className="row m-0">
          {/* Minimum rental period */}
          <div className="col-12 p-2 pe-0 ps-0">
            <CustomInputWithUnit
              value={currentCard.minimum_booking_period}
              selectValue={currentCard.minimum_booking_period_type}
              onChange={(e) => handleChangeSeasonPrice(e, index)}
              selectOnChange={(e) => handleChangeSeasonPrice(e, index)}
              selectName={"minimum_booking_period_type"}
              name={"minimum_booking_period"}
              label="Minimum booking"
              units={["minute", "hour", "day", "week", "month"]}
            />
          </div>
          {/* Price */}
          <div className="col-12 p-2 pe-0 ps-0">
            <CustomInputWithUnit
              name={"price"}
              onChange={(e) => handleChangeSeasonPrice(e, index)}
              selectOnChange={(e) => handleChangeSeasonPrice(e, index)}
              value={currentCard.price}
              selectValue={currentCard.type}
              selectName={"type"}
              label={"Price"}
              units={[
                "30 Minutes",
                "1 Hour",
                "2 Hours",
                "3 Hours",
                "Trip",
                "Item"
              ]}
            />
          </div>
          {/* minimum Hour price */}
          <div className="col-lg-12 col-12 p-2 pe-0 ps-0">
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
        <button
          disabled={formData.season_prices.length === 1}
          style={{
            opacity: formData.season_prices.length === 1 ? "0.5" : "1"
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