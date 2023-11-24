import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { SET_SELECTED_OPTIONS, SET_SUB_CATEGORIES } from "../../store/reducers/productReducer";

const customStyles = {
  //select  wrapper
  container: (provided, state) => ({
    ...provided,
    border: "none",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    width: "100%",
    padding: "8px 8px",
    fontSize: "1rem",
    fontWeight: "inherit",
    lineHeight: 1.5,
    border: "none",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "inherit",
  }),
  //select
  control: (provided, state) => ({
    ...provided,
    border: "none",
    borderRadius: "none",
    backgroundColor: "#f7f7f9",
    outline: state.isFocused ? "4px rgb(206, 212, 218) solid" : "null",
  }),
  indicatorContainer: (provided, state) => ({
    ...provided,
    backgroundColor: "#4f545a",
  }),
};

const MultiSelectInput = () => {
  const { subCategoryOptions, category } = useSelector(
    (state) => state.productDetail
  );
  const dispatch = useDispatch();
  return (
    <Select
      key={category}
      styles={customStyles}
      closeMenuOnSelect={false}
      defaultValue="...Choose"
      isMulti
      options={subCategoryOptions}
      onChange={(options) => {
        console.log("options: ", options);
        dispatch(SET_SELECTED_OPTIONS(options));
        dispatch(SET_SUB_CATEGORIES(options.map(o => o.value)));
      }}
    />
  );
};

export default MultiSelectInput;
