import React, { useState } from "react";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const ResetForm = ({
  setResetPasswordStep,
  formData,
  setFormData,
  setOtpFromResponse
}) => {
  const [formType, setFormType] = useState("email");
  let formComponent;

  switch (formType) {
    case "email":
      formComponent = (
        <EmailForm
          formData={formData}
          setFormData={setFormData}
          setOtpFromResponse={setOtpFromResponse}
          setResetPasswordStep={setResetPasswordStep}
        />
      );
      break;
    case "phone":
      formComponent = (
        <PhoneForm
          formData={formData}
          setFormData={setFormData}
          setResetPasswordStep={setResetPasswordStep}
        />
      );
      break;
    default:
      formComponent = (
        <EmailForm
          formData={formData}
          setFormData={setFormData}
          setOtpFromResponse={setOtpFromResponse}
          setResetPasswordStep={setResetPasswordStep}
        />
      );
      break;
  }

  return (
    <div className="reset-form">
      <div className="tabs">
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

export default ResetForm;
