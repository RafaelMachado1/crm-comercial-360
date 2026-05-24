import { create } from "zustand";
import { persist } from "zustand/middleware";

type CustomerFiltersState = {
  searchTerm: string;
  selectedStatus: string;
  selectedSegment: string;
  setSearchTerm: (searchTerm: string) => void;
  setSelectedStatus: (selectedStatus: string) => void;
  setSelectedSegment: (selectedSegment: string) => void;
  resetFilters: () => void;
};

export const useCustomerFiltersStore = create<CustomerFiltersState>()(
  persist(
    (set) => ({
      searchTerm: "",
      selectedStatus: "todos",
      selectedSegment: "todos",

      setSearchTerm: (searchTerm) => {
        set({ searchTerm });
      },

      setSelectedStatus: (selectedStatus) => {
        set({ selectedStatus });
      },

      setSelectedSegment: (selectedSegment) => {
        set({ selectedSegment });
      },

      resetFilters: () => {
        set({
          searchTerm: "",
          selectedStatus: "todos",
          selectedSegment: "todos",
        });
      },
    }),
    {
      name: "crm-customer-filters",
    }
  )
);