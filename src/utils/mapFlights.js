// Helper function to convert raw flight option into flat UI-friendly object
function mapSingleFlight(flightData, airlineDetails) {



    // Unique identifier for each flight option
    const id = flightData.flUnqiueId;

    // Pre-calculated UI details from API
    const otherDetails = flightData.otherDetails;

    const price = Number(otherDetails.lowestPrice); // Convert to number for sorting/filtering
    const stops = otherDetails.totalStops;// Total stops count
    const departureTime = otherDetails.departureTime; // Normalized departure time

    // Flight segments array (each segment = one leg of journey)
    const segments = flightData.flights;

    const firstSegment = segments[0]; // Journey start
    const lastSegment = segments[segments.length - 1];// Journey end

    const flightNumber = firstSegment.fltNo;// Flight number
    const airlineCode = firstSegment.airlineCode;// Airline code

    const airlineName =
        airlineDetails[airlineCode]?.name || airlineCode;


    const origin = firstSegment.departureAirport.code;// Origin airport
    const destination = lastSegment.arrivalAirport.code;// Destination airport

    const arrivalTime = lastSegment.arrivalAirport.time;// Arrival time

    // Calculate total duration by summing segment durations
    const duration = segments.reduce(
        (total, segment) => total + segment.durationInMin,
        0
    );

    // Return flat mapped flight object
    return {
        id,
        airlineCode,
        flightNumber,
        airlineName,
        origin,
        destination,
        departureTime,
        arrivalTime,
        duration,
        stops,
        price
    };
}


export function mapFlightsData(rawData) {
    // Safely access sectors from deeply nested API response
    const sectors = rawData?.data?.result?.sectors;

    const airlineDetails = rawData?.data?.result?.metaData?.airlineDetail || {};


    // If no sectors exist, return empty structure to prevent crashes
    if (!sectors) {
        return { outbound: [], return: [] };
    }

    // Get all sector keys (each represents a journey direction)
    const sectorKeys = Object.keys(sectors);

    // First key = outbound journey, second = return journey
    const outboundKey = sectorKeys[0];
    const returnKey = sectorKeys[1];

    // Extract outbound and return sector objects
    const outboundSector = sectors[outboundKey];
    const returnSector = sectors[returnKey] || {};

    // Each key inside a sector represents one flight option
    const outboundFlightKeys = Object.keys(outboundSector);
    const returnFlightKeys = Object.keys(returnSector);

    // Arrays to store mapped flight objects
    const outboundFlights = [];
    const returnFlights = [];

    // Loop through each outbound flight option
    outboundFlightKeys.forEach((key) => {

        const flightData = outboundSector[key];

        // Convert raw flight data into mapped object
        const mappedFlight = mapSingleFlight(flightData, airlineDetails);

        outboundFlights.push(mappedFlight);
    });


    // Loop through each return flight option
    returnFlightKeys.forEach((key) => {

        const flightData = returnSector[key];

        // Convert raw flight data into mapped object
        const mappedFlight = mapSingleFlight(flightData, airlineDetails);

        returnFlights.push(mappedFlight);
    });

    // Return grouped flights by journey direction
    return {
        outbound: outboundFlights,
        return: returnFlights,
        minPrice: Math.floor(
            Math.min(
                ...outboundFlights.map((f) => f.price),
                ...returnFlights.map((f) => f.price)
            )
        ),
        maxPrice: Math.ceil(
            Math.max(
                ...outboundFlights.map((f) => f.price),
                ...returnFlights.map((f) => f.price)
            )
        )
    };


}

