import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  House,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  CalendarDays,
} from "lucide-react";
import { useProperties } from "../context/useProperties";

function MyPropertiesPage() {
  const { agentProperties } = useProperties();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Draft",
    "Pending Review",
    "Approved",
    "Rejected",
    "Published",
  ];

  const filteredProperties =
    activeFilter === "All"
      ? agentProperties
      : agentProperties.filter(
          (property) => property.listingStatus === activeFilter
        );

  function getStatusStyle(status) {
    const styles = {
      Draft: "bg-gray-100 text-gray-700",
      "Pending Review": "bg-yellow-100 text-yellow-800",
      Approved: "bg-blue-100 text-blue-800",
      Rejected: "bg-red-100 text-red-800",
      Published: "bg-green-100 text-green-800",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  }

  function formatPrice(price) {
    return `₦${Number(price).toLocaleString("en-NG")}`;
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
              Agent Workspace
            </p>
            <h1 className="text-3xl font-bold text-[#252925] sm:text-4xl">
              My Properties
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your property listings and track their approval status.
            </p>
          </div>

          <Link
            to="/dashboard/agent/properties/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174C3C] px-6 py-3 font-semibold text-white transition hover:bg-[#103A2D]"
          >
            <Plus size={20} />
            Add New Property
          </Link>
        </div>

        {/* Listing Summary */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Listings",
              value: agentProperties.length,
            },
            {
              label: "Drafts",
              value: agentProperties.filter(
                (property) => property.listingStatus === "Draft"
              ).length,
            },
            {
              label: "Pending Review",
              value: agentProperties.filter(
                (property) => property.listingStatus === "Pending Review"
              ).length,
            },
            {
              label: "Published",
              value: agentProperties.filter(
                (property) => property.listingStatus === "Published"
              ).length,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-[#174C3C]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-[#174C3C] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Property Listings */}
        {filteredProperties.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#174C3C]/10">
              <House size={30} className="text-[#174C3C]" />
            </div>

            <h2 className="text-xl font-bold text-[#252925]">
              {agentProperties.length === 0
                ? "You haven't added any properties yet"
                : `No ${activeFilter.toLowerCase()} listings`}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {agentProperties.length === 0
                ? "Start by adding your first property to House&Serv."
                : "There are currently no listings in this category."}
            </p>

            {agentProperties.length === 0 && (
              <Link
                to="/dashboard/agent/properties/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-6 py-3 font-semibold text-white hover:bg-[#103A2D]"
              >
                <Plus size={19} />
                Add Your First Property
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProperties.map((property) => (
              <article
                key={property.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="relative h-60 bg-gray-100">
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <House size={48} className="text-gray-300" />
                    </div>
                  )}

                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      property.listingStatus
                    )}`}
                  >
                    {property.listingStatus}
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#174C3C]">
                        {property.type} · {property.status}
                      </p>
                      <h2 className="mt-1 text-xl font-bold text-[#252925]">
                        {property.name}
                      </h2>
                    </div>
                  </div>

                  <p className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    {property.location}
                  </p>

                  <p className="mb-5 text-xl font-bold text-[#174C3C]">
                    {formatPrice(property.price)}
                    <span className="ml-1 text-sm font-normal text-gray-500">
                      {property.priceSuffix}
                    </span>
                  </p>

                  <div className="mb-5 flex flex-wrap gap-4 border-y border-gray-100 py-4 text-sm text-gray-600">
                    {property.bedrooms && (
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={17} />
                        {property.bedrooms} Beds
                      </span>
                    )}

                    {property.bathrooms && (
                      <span className="flex items-center gap-1.5">
                        <Bath size={17} />
                        {property.bathrooms} Baths
                      </span>
                    )}

                    <span className="flex items-center gap-1.5">
                      <Maximize size={17} />
                      {property.size}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      Added {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                    <span>ID: {property.id}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPropertiesPage;
