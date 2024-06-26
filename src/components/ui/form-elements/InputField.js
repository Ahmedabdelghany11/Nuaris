import React from "react";

const InputField = ({
  htmlFor,
  label,
  placeholder,
  type = "text",
  id,
  hint,
  formData,
  setFormData,
  value,
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <input
        placeholder={placeholder}
        className="form-control"
        type={type}
        id={id}
        name={id}
        required
        value={value || formData[htmlFor]}
        onChange={(e) => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      />
    </div>
  );
};

export default InputField;
