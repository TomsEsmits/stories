import React from "react";
import { InputWithLabel } from "./InputWithLabel";

export const SearchForm = ({
  handleSearchSubmit,
  handleSearchInput,
  searchTerm,
}) => {
  return (
    <form onSubmit={handleSearchSubmit}>
      <InputWithLabel
        id="search"
        searchTerm={searchTerm}
        type="text"
        isFocused
        onInputChange={handleSearchInput}
      >
        <b>Search:</b>
      </InputWithLabel>
      <button
        type="submits"
        disabled={!searchTerm}
      >
        Search
      </button>
    </form>
  );
};
