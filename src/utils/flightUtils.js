// Filter flights based on stops selection
export function filterByStops(flights, selectedStops) {
    if (!selectedStops.length) return flights;

    return flights.filter((flight) =>
        selectedStops.includes(flight.stops)
    );
}

// Sort flights based on selected criteria
export function sortFlights(flights, sortBy) {
    const sorted = [...flights];

    if (sortBy === "price") {
        return sorted.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "duration") {
        return sorted.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "departure") {
        return sorted.sort(
            (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
        );
    }

    return sorted;
}

// Filter flights by pricerange
export function filterByPrice(flights, priceRange) {
    const [min, max] = priceRange;

    return flights.filter(
        (flight) => flight.price >= min && flight.price <= max
    );
}