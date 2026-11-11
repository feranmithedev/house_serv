import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, House } from "lucide-react";

import PropertyCard from "../components/properties/PropertyCard";
import properties from "../data/properties";
import { useProperties } from "../context/useProperties";

function PropertiesPage() {
  const { agentProperties } = useProperties();

  const approvedAgentProperties = agentProperties.filter(
    (property) => property.listingStatus === "Approved"
  );

  const allProperties = [...properties, ...approvedAgentProperties];
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");

  const [listingType, setListingType] = useState(
    searchParams.get("type") || "All"
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const filteredProperties = allProperties.filter((property) => {
    const matchesLocation = property.location
      .toLowerCase()
      .includes(location.toLowerCase());

    const matchesType =
      listingType === "All" ||
      property.status === (listingType === "Rent" ? "For Rent" : "For Sale");

    const matchesCategory =
      category === "All" ||
      property.type?.toLowerCase() === category.toLowerCase().replace(/s$/, "");

    return matchesLocation && matchesType && matchesCategory;
  });

  function handleSearch(e) {
    e.preventDefault();

    setSearchParams({
      location,
      type: listingType,
      category,
    });
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Find your space
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-5xl">
            Explore properties
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Discover spaces that match your lifestyle, budget and location. Your
            next home could be right here.
          </p>
        </div>

        {/* Search and filters */}
        <form
          onSubmit={handleSearch}
          className="mb-10 flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm md:flex-row md:items-center"
        >
          <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-200 px-4">
            <Search size={19} className="text-[#174C3C]" />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search by location..."
              className="w-full py-4 text-sm outline-none"
            />
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4">
            <SlidersHorizontal size={19} className="text-[#174C3C]" />

            <select
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              className="w-full cursor-pointer bg-transparent py-4 text-sm outline-none"
            >
              <option value="All">All properties</option>
              <option value="Rent">For rent</option>
              <option value="Buy">For sale</option>
            </select>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4">
            <House size={19} className="text-[#174C3C]" />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full cursor-pointer bg-transparent py-4 text-sm outline-none"
            >
              <option value="All">All categories</option>
              <option value="Apartments">Apartments</option>
              <option value="Houses">Houses</option>
              <option value="Land">Land</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-[#174C3C] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#10382C]"
          >
            Apply filters
          </button>
        </form>

        {/* Results heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#252925]">
              Available properties
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredProperties.length} properties found
            </p>
          </div>
        </div>

        {/* Property results */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-16 text-center">
            <House size={42} className="mx-auto text-[#174C3C]/50" />

            <h3 className="mt-5 text-xl font-bold text-[#252925]">
              No properties found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another location or change your property filters.
            </p>

            <button
              onClick={() => {
                setLocation("");
                setListingType("All");
                setCategory("All");
                setSearchParams({});
              }}
              className="mt-6 rounded-lg bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertiesPage;
