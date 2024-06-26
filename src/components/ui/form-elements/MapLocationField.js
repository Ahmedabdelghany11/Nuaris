import React from "react";

const MapLocationField = ({ htmlFor, label, hint, setShowModal, name }) => {
  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} <span>{hint}</span>
      </label>
      <div className="searchMapGroup">
        <span>{name}</span>
        <button onClick={handleShowModal} />
      </div>
    </div>
  );
};

export default MapLocationField;
