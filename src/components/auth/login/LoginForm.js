import React from "react";
import handWave from "../../../assets/images/waving-hand.svg";
import { useState } from "react";
import UserNameForm from "./UserNameForm";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const LoginForm = ({
  userTypeSelected,
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData
}) => {
  const [formType, setFormType] = useState("userNameAndPassword");
  let formComponent;
  
  switch (formType) {
    case "userNameAndPassword":
      formComponent = (
        <UserNameForm
          setShowLoginForm={setShowLoginForm}
          userTypeSelected={userTypeSelected}
        />
      );
      break;
    case "email":
      formComponent = (
        <EmailForm
          userTypeSelected={userTypeSelected}
          setShowLoginForm={setShowLoginForm}
          SetShowOtpForm={SetShowOtpForm}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    case "phone":
      formComponent = (
        <PhoneForm
          setShowLoginForm={setShowLoginForm}
          SetShowOtpForm={SetShowOtpForm}
          formData={formData}
          setFormData={setFormData}
        />
      );
      break;
    default:
      formComponent = <UserNameForm setShowLoginForm={setShowLoginForm} />;
      break;
  }

  return (
    <div className="form-container">
      <h2 className="head">
        Welcome Back ! <img src={handWave} alt="hand-wave" />
      </h2>
      <p className="sub-head">
        Please enter the email address Or phone number registered with us as an{" "}
        <span>{userTypeSelected}</span>.
      </p>
      <div className="tabs">
        <button
          className={formType === "userNameAndPassword" ? "active" : ""}
          onClick={() => setFormType("userNameAndPassword")}
        >
          Username
        </button>
        <button
          className={formType === "email" ? "active" : ""}
          onClick={() => setFormType("email")}
        >
          Email
        </button>
        <button
          className={formType === "phone" ? "active" : ""}
          onClick={() => setFormType("phone")}
        >
          Phone Number
        </button>
      </div>
      {formComponent}
    </div>
  );
};

export default LoginForm;
