import { useMemo } from "react";

import { useCustomerFiltersStore } from "../stores/customerFiltersStore";
import { filterCustomers } from "../utils/customerUtils";

import type { Customer } from "../types/crm";

type UseCustomerFiltersReturn = {
  searchTerm: string;
  setSearchTerm: (newValue: string) => void;
  selectedStatus: string;
  setSelectedStatus: (newValue: string) => void;
  selectedSegment: string;
  setSelectedSegment: (newValue: string) => void;
  resetFilters: () => void;
  filteredCustomers: Customer[];
};

function useCustomerFilters(customers: Customer[]): UseCustomerFiltersReturn {
  const {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedSegment,
    setSelectedSegment,
    resetFilters,
  } = useCustomerFiltersStore();

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
    resetFilters,
    filteredCustomers,
  };
}

export default useCustomerFilters;