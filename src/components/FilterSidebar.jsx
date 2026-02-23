export default function FilterSidebar({ filters, setFilters, minPrice, maxPrice }) {
    return (
        <div className="md:col-span-1 bg-white rounded-md shadow-sm border border-gray-100 overflow-y-auto overflow-x-hidden h-full">

            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-800 text-base tracking-wide uppercase">Filters</h2>
            </div>

            <div className="px-4 py-2 space-y-6">

                {/* Stops Filter */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Stops</p>

                    <div className="flex flex-col gap-1">
                        {[0, 1, 2].map((stop) => (
                            <label
                                key={stop}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
                                    ${filters.stops.includes(stop) ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-600"}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={filters.stops.includes(stop)}
                                    onChange={() => {
                                        const updated = filters.stops.includes(stop)
                                            ? filters.stops.filter((s) => s !== stop)
                                            : [...filters.stops, stop];
                                        setFilters({ stops: updated });
                                    }}
                                    className="accent-blue-500 cursor-pointer w-4 h-4"
                                />
                                <span className="text-sm font-medium">
                                    {stop === 0 ? "Non-stop" : stop === 1 ? "1 Stop" : "2+ Stops"}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Sort By */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Sort By</p>

                    <div className="flex flex-col gap-1">
                        {["price", "duration", "departure"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilters({ sortBy: type })}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                                    ${filters.sortBy === type
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-600 hover:bg-gray-50"}`}
                            >
                                {type === "price" ? "₹ Price" : type === "duration" ? "⏱️ Duration" : "⏰ Departure Time"}
                            </button>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Price Range */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Price Range</p>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            ₹{filters.priceRange[1].toLocaleString("en-IN")}
                        </span>
                    </div>

                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters({ priceRange: [minPrice, Number(e.target.value)] })}
                        className="w-full accent-blue-500"
                    />

                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>₹{minPrice.toLocaleString("en-IN")}</span>
                        <span>₹{maxPrice.toLocaleString("en-IN")}</span>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Trip Type */}
                <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Trip Type</p>

                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                        {["oneWay", "roundTrip"].map((type, i) => (
                            <button
                                key={type}
                                onClick={() => setFilters({ tripType: type })}
                                className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer
                                    ${i === 0 ? "border-r border-gray-200" : ""}
                                    ${filters.tripType === type
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-500 hover:bg-gray-50"}`}
                            >
                                {type === "oneWay" ? "One Way" : "Round Trip"}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}