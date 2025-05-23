import React from "react";


export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  error = ""
}) {
  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-box"
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
