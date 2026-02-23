import { create } from "zustand";

export const useFlightStore = create((set) => ({
    outboundFlights: [],
    returnFlights: [],
    maxPrice: 0,
    minPrice: 0,
    isLoading: true,
    hasError: false,

    // Filter state
    filters: {
        tripType: "roundTrip",
        stops: [],
        priceRange: [0, 0],
        sortBy: "price",
    },

    // Action to set mapped flights
    setFlights: (data) =>
        set({
            outboundFlights: data.outbound,
            returnFlights: data.return,
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
        }),

    // Action to Update filters
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),

    setLoading: (value) => set({ isLoading: value }),
    setError: (value) => set({ hasError: value }),
}));

