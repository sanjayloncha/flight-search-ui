export default function SearchBar({ searchQuery }) {
    console.log(searchQuery);
    const { origin, destination, departureDate, returnDate, ADT, CHD, INF, className, } = searchQuery;
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-3 mb-4 flex items-center justify-between w-full">

            {/* From */}
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">From</span>
                <span className="text-sm font-semibold text-gray-800">{origin}</span>
            </div>

            <span className="text-gray-300 text-lg">⇄</span>

            {/* To */}
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">To</span>
                <span className="text-sm font-semibold text-gray-800">{destination}</span>
            </div>

            <div className="w-px h-8 bg-gray-200" />

            {/* Departure */}
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Departure</span>
                {/* <span className="text-sm font-semibold text-gray-800">{departureDate}</span> */}
                <span className="text-sm font-semibold text-gray-800">{new Date(departureDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}</span>
            </div>

            <div className="w-px h-8 bg-gray-200" />

            {/* Return */}
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Return</span>
                <span className="text-sm font-semibold text-gray-800">{new Date(returnDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}</span>
            </div>

            <div className="w-px h-8 bg-gray-200" />

            {/* Passengers */}
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Passengers</span>
                <span className="text-sm font-semibold text-gray-800">{Number(ADT) + Number(CHD) + Number(INF)} Passengers</span>
            </div>

            <div className="w-px h-8 bg-gray-200" />

            {/* Class */}
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Class</span>
                <span className="text-sm font-semibold text-gray-800">{className}</span>
            </div>

        </div>
    );
}