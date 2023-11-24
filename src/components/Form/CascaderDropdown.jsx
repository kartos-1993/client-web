import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Cascader from "rc-cascader";
import DropdownCascade from "react-dropdown-cascade";
import { getSubCategories } from "../../api/subCategory";
import axios from "axios";
import styled from "styled-components";
import { KitButton, KitForm } from "../../kit";

function CascaderDropdown({ options }) {
  const [dropdownValue, setDropdownValue] = useState();

  useEffect(() => {}, []);

  const CI = (customInputProps, commonProps) => {
    return (
      <KitForm.Control
        size="sm"
        readOnly
        className="mr-3"
        {...customInputProps}
        {...commonProps}
      />
    );
  };

  return (
    <>
      <SDropdownCascade
        customInput={CI}
        value={dropdownValue}
        customStyles={{
          dropdown: {
            style: {},
          },
        }}
        items={options}
        onSelect={(value, selectedItems) => {
          setDropdownValue(value);
        }}
      />
      {/* <button type="button" class="btn btn-link">
        Reset
      </button> */}
    </>
  );
}

export default CascaderDropdown;

const SDropdownCascade = styled(DropdownCascade)`
  width: 100%;
`;
