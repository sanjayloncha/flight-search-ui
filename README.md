# ✈️ Flight Search & Listing Module

## Project Overview

A Flight Search and Listing module built using Next.js. The application consumes a provided mock flight dataset, flattens a deeply nested airline-industry data structure into outbound and return flight results, and presents them through a responsive UI with filtering, sorting, and pagination capabilities.

---

## Tech Stack

- **Next.js** — App Router (JavaScript)
- **Tailwind CSS** — Styling
- **Zustand** — Global state management

---

## Features Implemented

- **Data mapping & flattening** of deeply nested JSON into usable flight records
- **Outbound & return flight separation** — each leg displayed independently
- **Stops filtering** — multi-select checkboxes (non-stop, 1 stop, 2+ stops)
- **Price range filtering** — slider with min/max derived from actual flight data
- **Sorting** — by price, duration, or departure time
- **Trip type toggle** — switch between one-way and round-trip display modes
- **Pagination** — "Load More" button to progressively reveal additional results
- **Loading state** — shown while data is being processed
- **Empty state** — friendly message when no flights match active filters
- **Basic error handling** — graceful fallback if data fails to load
- **Responsive UI layout** — single column for one-way, two-column side-by-side for round trips

---

## Data Mapping Approach

The mock JSON follows a normalized airline-industry structure:

```
result → journeys → sectors → flight options → segments / fares
```

- **Sectors** within each journey represent individual legs of the trip. The first sector maps to **outbound** flights and the second to **return** flights.
- **Flight segments** within each sector are combined to calculate total duration and stop count.
- **Key UI fields** — departure/arrival times, origin, destination, duration, stops, airline info, and price — are extracted from the deepest segment and fare levels and flattened into a single flight object per result.
- **Min and max price** are computed from the mapped data and used to drive the price range slider dynamically.

This mapping happens once on load inside `mapFlights.js`, producing two clean arrays that the rest of the UI consumes directly.

---

## Folder Structure

```
src/
├── app/
│   └── flights/
│       └── page.js               # Main flights page — data fetching, state, layout
├── components/
│   ├── FlightCard.jsx            # Individual flight card UI
│   ├── FilterSidebar.jsx         # Filter sidebar (stops, sort, price, trip type)
│   └── SearchBar.jsx             # Static search bar (route, dates, passengers, class)
├── store/
│   └── flightStore.js            # Zustand store for flights, filters & state
├── utils/
│   ├── mapFlights.js             # Nested JSON flattening logic
│   └── flightUtils.js            # Filtering and sorting helpers
└── data/
    └── flights.json              # Mock data source

public/
└── airlines/                     # Airline logo images
```

---

## How to Run the Project

1. **Clone the repository**
```bash
git clone https://github.com/sanjayloncha/flight-search-ui.git
cd flight-search-ui
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000/flights
```

---

## Note

The provided JSON already represents a **single pre-fetched search result**. As a result, no real search API call is made — only client-side filtering and sorting are implemented on the mapped flight data.