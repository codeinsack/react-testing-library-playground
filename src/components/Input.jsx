const Input = ({ id, label, help, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        className="form-control"
        id={id}
        type="text"
        onChange={(event) => onChange(event.target.value)}
      />
      <span>{help}</span>
    </div>
  );
};

export default Input;
