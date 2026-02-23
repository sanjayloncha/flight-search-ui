export default function FlightCard({ flight }) {
    const departure = new Date(flight.departureTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const arrival = new Date(flight.arrivalTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const formattedPrice = Number(flight.price).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    });

    return (
        <div className="w-full bg-white rounded-lg px-3 py-4 shadow-md hover:shadow-lg border border-gray-100">

            {/* Airline Info Row */}
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded-md flex-shrink-0">
                    <img
                        src={`/airlines/${flight.airlineCode}.png`}
                        alt={flight.airlineName}
                        className="w-6 h-6 object-contain"
                    />
                </div>
                <div className="leading-tight min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{flight.airlineName}</p>
                    <p className="text-xs text-gray-500">{flight.airlineCode} {flight.flightNumber}</p>
                </div>
            </div>

            {/* Time + Route Row */}
            <div className="flex items-center gap-2 mb-3">
                {/* Departure */}
                <div className="text-center flex-shrink-0">
                    <p className="text-base font-bold">{departure}</p>
                    <p className="text-xs text-gray-500">{flight.origin}</p>
                </div>

                {/* Timeline */}
                <div className="flex-1 text-center px-1">
                    <p className="text-xs text-gray-500">
                        {Math.floor(flight.duration / 60)}h {flight.duration % 60}m
                    </p>
                    <div className="border-t border-gray-300 my-1" />
                    <p className="text-xs text-gray-400">
                        {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                    </p>
                </div>

                {/* Arrival */}
                <div className="text-center flex-shrink-0">
                    <p className="text-base font-bold">{arrival}</p>
                    <p className="text-xs text-gray-500">{flight.destination}</p>
                </div>
            </div>

            {/* Price + Button Row */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <p className="text-lg font-bold text-gray-900">₹{formattedPrice}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer">
                    Book
                </button>
            </div>

        </div>
    );
}   