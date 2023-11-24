import React from "react";
import { KitFormControlText } from "../../kit";



const SearchInput = ({ keyword, searchInputChange }) => {
  return (
    <div>
      <KitFormControlText
        placeholder="search"
        value={keyword}
        onChange={searchInputChange}
      />
    </div>
  );
};

export default SearchInput;
