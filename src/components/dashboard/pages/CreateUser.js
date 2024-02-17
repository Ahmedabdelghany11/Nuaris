import React, { useState, useEffect, useRef } from "react";
import PageHeader from "../layout/PageHeader";
import NameField from "../../ui/form-elements/NameField";
import ReactFlagsSelect from "react-flags-select";
import InputField from "../../ui/form-elements/InputField";
import PhoneField from "../../ui/form-elements/PhoneField";
import { useSelector } from "react-redux";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import SubmitButton from "../../ui/form-elements/SubmitButton";

const CreateUser = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const positions = useSelector((state) => state.positions.positions);
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const form = useRef(null);
  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        parent: Number(user.id),
      }));
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/users/invite-user/", formData);
      toast.success("Invitation sent successfully");
      form.current.reset();
    } catch (error) {
      toast.error("An error occurred while sending the invitation");
      form.current.reset();
    } finally {
      setLoading(false);
    }
  };
  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
    setFormData((prevFormData) => ({ ...prevFormData, nationality: code }));
  };
  const backLinks = [
    { name: "Dashboard", to: "/host-dashboard" },
    { name: "Invite User", to: "/host-dashboard/invite-user" },
  ];
  return (
    <React.Fragment>
      <PageHeader
        name="Create a User"
        backLinks={backLinks}
        hint="(employee)"
      />
      <div className="inner_card">
        <form onSubmit={handleSubmit} ref={form} className="row m-0 form-ui">
          <div className="col-lg-4  col-12 p-2">
            <NameField formData={formData} setFormData={setFormData} />
          </div>
          <div className="col-lg-4  col-12 p-2">
            <div className="input-field">
              <label htmlFor="positions">Positions</label>
              <select
                name="positions"
                id="positions"
                required
                onChange={(e) => {
                  const selectedOptionId =
                    e.target.options[e.target.selectedIndex].getAttribute("id");
                  setFormData({
                    ...formData,
                    position: Number(selectedOptionId),
                  });
                }}
              >
                <option value="select" disabled selected>
                  Select
                </option>
                {positions.map((option) => (
                  <option key={option.id} id={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-4  col-12 p-2">
            <div className="input-field">
              <label htmlFor="Nationality">Nationality</label>
              <ReactFlagsSelect
                searchable={true}
                selectedSize={false}
                onSelect={handleCountrySelect}
                selected={selectedCountry}
                defaultCountry="AE"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="email"
              label="Email Address"
              placeholder="EX: mail@mail.com"
              type="email"
              id="email"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              formData={formData}
              setFormData={setFormData}
              id="phone_number"
            />
          </div>
          <div className="col-12 p-2 d-flex justify-content-end">
            <SubmitButton loading={loading} name="Create" className="w-25" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateUser;