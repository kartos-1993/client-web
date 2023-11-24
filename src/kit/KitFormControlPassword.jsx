import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

import styled from "styled-components";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

const KitFormControlPassword = ({
  placeholder,
  value,
  name,
  handleChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SFormControl>
      <FormControl
        type={showPassword ? "text" : "password"}
        required
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={value}
      />
      <span onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <VscEye /> : <VscEyeClosed />}
      </span>
    </SFormControl>
  );
};

export default KitFormControlPassword;

const SFormControl = styled.div`
  position: relative;
  margin-bottom: 1rem;
  color: black;
  span svg {
    position: absolute;
    right: 23px;
    top: 13px;
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;
