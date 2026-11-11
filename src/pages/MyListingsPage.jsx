import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  House,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Trash2,
  Pencil,
} from "lucide-react";
import { useProperties } from "../context/useProperties";

function MyListingsPage() {
  const { agentProperties, deleteProperty } = useProperties();

  function handleDelete(propertyId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property listing?"
    );

    if (confirmed) {
      deleteProperty(propertyId);
    }
  }

  function getStatusStyle(status) {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Draft":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/dashboard/agent"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#174C3C] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
              Agent Workspace
            </p>
            <h1 className="text-3xl font-bold text-[#252925] sm:text-4xl">
              My Listings
            </h1>
            <p className="mt-2 text-gray-600">
              Manage the properties you have added to House&Serv.
            </p>
          </div>

          <Link
            to="/dashboard/agent/properties/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 font-semibold text-white transition hover:bg-[#103A2D]"
          >
            <Plus size={19} />
            Add New Property
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
              label: "Approved",
              value: agentProperties.filter(
                (property) => property.listingStatus === "Approved"
              ).length,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-[#174C3C]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {agentProperties.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#174C3C]/10 text-[#174C3C]">
              <House size={30} />
            </div>

            <h2 className="text-xl font-bold text-[#252925]">
              No properties listed yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Your property listings will appear here once you add them.
            </p>

            <Link
              to="/dashboard/agent/properties/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-6 py-3 font-semibold text-white hover:bg-[#103A2D]"
            >
              <Plus size={18} />
              Add Your First Property
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {agentProperties.map((property) => (
              <article
                key={property.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm sm:flex"
              >
                <div className="h-56 bg-gray-100 sm:h-auto sm:w-64 sm:shrink-0">
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <House size={40} />
                    </div>
                  )}
                </div>

                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        property.listingStatus
                      )}`}
                    >
                      {property.listingStatus}
                    </span>

                    <span className="text-sm text-gray-500">
                      {property.status}
                    </span>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-[#252925]">
                    {property.name}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} />
                    {property.location}
                  </p>

                  <p className="mt-4 text-xl font-bold text-[#174C3C]">
                    ₦{Number(property.price).toLocaleString("en-NG")}
                    {property.priceSuffix && (
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        {property.priceSuffix}
                      </span>
                    )}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-500">
                    {property.bedrooms && (
                      <span className="flex items-center gap-2">
                        <BedDouble size={17} />
                        {property.bedrooms} Beds
                      </span>
                    )}

                    {property.bathrooms && (
                      <span className="flex items-center gap-2">
                        <Bath size={17} />
                        {property.bathrooms} Baths
                      </span>
                    )}

                    <span className="flex items-center gap-2">
                      <Ruler size={17} />
                      {property.size}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <Link
                      to={`/dashboard/agent/properties/${property.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#174C3C] px-4 py-2 text-sm font-semibold text-[#174C3C] transition hover:bg-[#174C3C]/5"
                    >
                      <Pencil size={16} />
                      Edit Listing
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(property.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete Listing
                    </button>
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

export default MyListingsPage;
