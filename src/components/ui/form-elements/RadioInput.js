function RadioInput({ option, hint, name, checked, onChange }) {
  return (
    <div className="checkbox-row checkbox-radio-row col-12">
      <input
        id={option}
        name={name}
        type="radio"
        value={option}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={option}>
        {option} {hint && <span className="hint">{hint}</span>}
      </label>
    </div>
  );
}

export default RadioInput;
