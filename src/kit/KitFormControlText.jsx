import React from "react";
import { FormControl } from "react-bootstrap";

const KitFormControlText = ({ value, handleChange, placeholder,name }) => {
  return (
    <FormControl
      required
      placeholder={placeholder}
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
    />
  );
};

export default KitFormControlText;
