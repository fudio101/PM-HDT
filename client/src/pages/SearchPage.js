import React from "react";

import FilterSearch from "../components/item/Filter/FilterSearch";
import PaginatedItems from "../components/item/pagination/PaginatedItem";

function SearchPage() {
  return (
    <>
      <FilterSearch />
      <PaginatedItems itemsPerPage={3} />
    </>
  );
}

export default SearchPage;
