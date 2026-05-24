import { useMemo } from "react";

import useLocalStorage from "./useLocalStorage";
import { filterCustomers } from "../utils/customerUtils";

import type { Customer } from "../types/crm";

type UseCustomerFiltersReturn = {
  searchTerm: string;
  setSearchTerm: (newValue: string) => void;
  selectedStatus: string;
  setSelectedStatus: (newValue: string) => void;
  selectedSegment: string;
  setSelectedSegment: (newValue: string) => void;
  filteredCustomers: Customer[];
};

function useCustomerFilters(customers: Customer[]): UseCustomerFiltersReturn {
  const { value: searchTerm, setValue: setSearchTerm } =
    useLocalStorage<string>("crm-filter-search-term", "");

  const { value: selectedStatus, setValue: setSelectedStatus } =
    useLocalStorage<string>("crm-filter-selected-status", "todos");

  const { value: selectedSegment, setValue: setSelectedSegment } =
    useLocalStorage<string>("crm-filter-selected-segment", "todos");

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