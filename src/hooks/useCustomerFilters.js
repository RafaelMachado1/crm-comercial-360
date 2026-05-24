import { useMemo } from "react";

import useLocalStorage from "./useLocalStorage";
import { filterCustomers } from "../utils/customerUtils";

function useCustomerFilters(customers) {
  const { value: searchTerm, setValue: setSearchTerm } = useLocalStorage(
    "crm-filter-search-term",
    ""
  );

  const { value: selectedStatus, setValue: setSelectedStatus } =
    useLocalStorage("crm-filter-selected-status", "todos");

  const { value: selectedSegment, setValue: setSelectedSegment } =
    useLocalStorage("crm-filter-selected-segment", "todos");

  const filteredCustomers = useMemo(() => {
    return filterCustomers(customers, {
      searchTerm,
      selectedStatus,
      selectedSegment,
    });
  }, [customers, searchTerm, selectedStatus, selectedSegment]);

  return {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedSegment,
    setSelectedSegment,
    filteredCustomers,
  };
}

export default useCustomerFilters;