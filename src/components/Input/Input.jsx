const Input = ({ id, label, help, onChange, type = "text" }) => {
  let inputClass = "form-control";

  if (help) {
    inputClass += " is-invalid";
  }

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className={inputClass}
        id={id}
        type={type}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="invalid-feedback">{help}</span>
    </div>
  );
};

export default Input;
