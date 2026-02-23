"use client";

import { useEffect, useState } from "react";
import data from "@/data/flights.json";
import { useFlightStore } from "@/store/flightStore";
import { mapFlightsData } from "@/utils/mapFlights";
import { filterByStops, sortFlights, filterByPrice } from "@/utils/flightUtils"
import FlightCard from "@/components/FlightCard";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";

export default function FlightsPage() {

    const [visibleCount, setVisibleCount] = useState(10);
    // get loading state and action from store
    const isLoading = useFlightStore((state) => state.isLoading);
    const setLoading = useFlightStore((state) => state.setLoading);

    const searchQuery = data.data.result.searchQuery;

    const minPrice = useFlightStore((state) => state.minPrice);
    const maxPrice = useFlightStore((state) => state.maxPrice);

    const hasError = useFlightStore((state) => state.hasError);
    const setError = useFlightStore((state) => state.setError);

    // action from store to update flight state
    const setFlights = useFlightStore((state) => state.setFlights);

    // action from store to update filters state
    const setFilters = useFlightStore((state) => state.setFilters);

    // get filter object
    const filters = useFlightStore((state) => state.filters);

    // get outbound flights
    const outboundFlights = useFlightStore((state) => state.outboundFlights);

    // get return flights
    const returnFlights = useFlightStore((state) => state.returnFlights);

    const stopFilteredOutbound = filterByStops(outboundFlights, filters.stops);
    const stopFilteredReturn = filterByStops(returnFlights, filters.stops);

    const filteredOutbound = filterByPrice(
        stopFilteredOutbound,
        filters.priceRange
    );

    const filteredReturn = filterByPrice(
        stopFilteredReturn,
        filters.priceRange
    );

    // Apply sorting on filtered results
    const sortedOutbound = sortFlights(filteredOutbound, filters.sortBy);

    // Apply sorting on filtered results
    const sortedReturn = sortFlights(filteredReturn, filters.sortBy);


    const visibleOutbound = sortedOutbound.slice(0, visibleCount);
    const visibleReturn = sortedReturn.slice(0, visibleCount);


    useEffect(() => {
        setLoading(true);
        setError(false);

        setTimeout(() => {
            try {
                const mapped = mapFlightsData(data);
                setFlights(mapped);
                setFilters({ priceRange: [mapped.minPrice, mapped.maxPrice] });
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }, 800);
    }, [setFlights, setLoading, setError]);

    if (!isLoading && hasError) {
        return (
            <div className="p-10 text-center text-red-600 font-semibold">
                Something went wrong. Please try again.
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#efeff0]">

            {/* Centered width container */}
            <div className="max-w-[85%] mx-auto py-4">

                <SearchBar searchQuery={searchQuery} />

                {/* Grid layout container */}
                {isLoading ?
                    <div className="p-10 text-center text-lg font-semibol">
                        Loading flights...
                    </div>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">

                        {/* LEFT — FILTER SIDEBAR */}
                        <FilterSidebar
                            filters={filters}
                            setFilters={setFilters}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />

                        {/* RIGHT — FLIGHT RESULTS */}

                        <div className="md:col-span-3 bg-white p-4 rounded-md shadow overflow-x-hidden">

                            {filters.tripType === "roundTrip" ? (
                                /* ── TWO COLUMN LAYOUT ── */
                                <div className="flex flex-col h-full">

                                    {/* Two columns */}
                                    <div className="flex gap-4 items-start flex-1 overflow-hidden">

                                        {/* Outbound Column */}
                                        <div className="flex-1 min-w-0 flex flex-col h-full">
                                            <h2 className="text-lg font-bold mb-4 px-2 py-2 bg-blue-50 rounded text-blue-700 flex-shrink-0">
                                                ✈ Outbound Flights
                                            </h2>
                                            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                                                {sortedOutbound.length === 0 ? (
                                                    <p className="text-center text-gray-500 text-sm p-4">
                                                        No flights available. Modify filters & try again.
                                                    </p>
                                                ) : (
                                                    visibleOutbound.map((flight) => (
                                                        <FlightCard key={flight.id} flight={flight} />
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-px bg-gray-200 self-stretch" />

                                        {/* Return Column */}
                                        <div className="flex-1 min-w-0 flex flex-col h-full">
                                            <h2 className="text-lg font-bold mb-4 px-2 py-2 bg-green-50 rounded text-green-700 flex-shrink-0">
                                                ↩ Return Flights
                                            </h2>
                                            <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                                                {sortedReturn.length === 0 ? (
                                                    <p className="text-center text-gray-500 text-sm p-4">
                                                        No flights available. Modify filters & try again.
                                                    </p>
                                                ) : (
                                                    visibleReturn.map((flight) => (
                                                        <FlightCard key={flight.id} flight={flight} />
                                                    ))
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Single Load More — below both columns, centered */}
                                    {visibleCount < Math.max(sortedOutbound.length, sortedReturn.length) && (
                                        <div className="text-center py-4 border-t border-gray-100 flex-shrink-0">
                                            <button
                                                onClick={() => setVisibleCount((prev) => prev + 10)}
                                                className="px-6 py-2 bg-blue-500 text-white rounded"
                                            >
                                                Load More Flights
                                            </button>
                                        </div>
                                    )}

                                </div>

                            ) : (
                                /* ── SINGLE COLUMN LAYOUT (one-way) ── */
                                <div className="flex flex-col h-full">
                                    <h2 className="text-lg font-bold mb-4 px-2 py-2 bg-blue-50 rounded text-blue-700 flex-shrink-0">
                                        ✈ Outbound Flights
                                    </h2>
                                    <div className="space-y-4 overflow-y-auto overflow-x-hidden pr-4">
                                        {sortedOutbound.length === 0 ? (
                                            <p className="text-center text-gray-500 text-sm p-4">
                                                No flights available. Modify filters & try again.
                                            </p>
                                        ) : (
                                            visibleOutbound.map((flight) => (
                                                <FlightCard key={flight.id} flight={flight} />
                                            ))
                                        )}

                                        {/* Load More — inside scroll */}
                                        {visibleCount < sortedOutbound.length && (
                                            <div className="text-center">
                                                <button
                                                    onClick={() => setVisibleCount((prev) => prev + 10)}
                                                    className="px-6 py-2 bg-blue-500 text-white rounded"
                                                >
                                                    Load More Flights
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>


                    </div>
                }

            </div>
        </div>
    );

}
