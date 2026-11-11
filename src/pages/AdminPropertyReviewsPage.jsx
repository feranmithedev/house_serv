import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  House,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  X,
} from "lucide-react";
import { useProperties } from "../context/useProperties";

function AdminPropertyReviewsPage() {
  const { agentProperties, updateProperty } = useProperties();
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const pendingProperties = agentProperties.filter(
    (property) => property.listingStatus === "Pending Review"
  );

  function handleReview(propertyId, status) {
    const action = status === "Approved" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this property?`
    );

    if (!confirmed) return;

    updateProperty(propertyId, {
      listingStatus: status,
      reviewedAt: new Date().toISOString(),
    });

    setMessage(
      status === "Approved"
        ? "Property approved successfully!"
        : "Property rejected successfully."
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Administration
          </p>

          <h1 className="text-3xl font-bold text-[#252925] sm:text-4xl">
            Property Reviews
          </h1>

          <p className="mt-2 text-gray-600">
            Review property submissions before they are approved for
            publication.
          </p>
        </div>

        {message && (
          <p className="mb-6 rounded-xl bg-[#174C3C]/10 p-4 text-sm font-medium text-[#174C3C]">
            {message}
          </p>
        )}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
              <Clock size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Awaiting Review</p>
              <p className="text-2xl font-bold text-[#252925]">
                {pendingProperties.length}
              </p>
            </div>
          </div>
        </div>

        {pendingProperties.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <House size={40} className="mx-auto text-gray-400" />

            <h2 className="mt-4 text-xl font-bold text-[#252925]">
              No pending property submissions
            </h2>

            <p className="mt-2 text-gray-500">
              New property submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingProperties.map((property) => (
              <article
                key={property.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm sm:flex"
              >
                <div className="bg-gray-50 p-4 sm:w-80 sm:shrink-0">
                  <p className="mb-3 text-sm font-semibold text-[#252925]">
                    Property Images (
                    {property.images?.length || (property.image ? 1 : 0)})
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {(property.images?.length
                      ? property.images
                      : property.image
                      ? [{ src: property.image, name: "Property image" }]
                      : []
                    ).map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedImage(image.src)}
                        className="overflow-hidden rounded-xl bg-gray-200"
                      >
                        <img
                          src={image.src}
                          alt={`${property.name} - Image ${index + 1}`}
                          className="h-32 w-full object-cover transition hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>

                  {!property.image && !property.images?.length && (
                    <div className="flex h-40 items-center justify-center text-gray-400">
                      <House size={40} />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  {/* Property heading */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Pending Review
                      </span>

                      <span className="text-xs font-medium text-gray-400">
                        ID: {property.id}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#252925]">
                      {property.name || "Unnamed Property"}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} />
                      {property.location || "Location not provided"}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mt-6 rounded-xl bg-[#F7F3EA] p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Asking Price
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#174C3C]">
                      ₦{Number(property.price || 0).toLocaleString("en-NG")}
                      <span className="ml-1 text-sm font-medium text-gray-500">
                        {property.priceSuffix || ""}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {property.status || "Property listing"}
                    </p>
                  </div>

                  {/* Property information */}
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-bold text-[#252925]">
                      Property Information
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Property Type", property.type || "Not specified"],
                        ["Bedrooms", property.bedrooms || "N/A"],
                        ["Bathrooms", property.bathrooms || "N/A"],
                        [
                          "Property Size",
                          property.size ? `${property.size} sqm` : "N/A",
                        ],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-xl border border-gray-100 p-3"
                        >
                          <p className="text-xs text-gray-400">{label}</p>
                          <p className="mt-1 font-semibold text-[#252925]">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <h3 className="mb-2 text-sm font-bold text-[#252925]">
                      Property Description
                    </h3>

                    <p className="text-sm leading-7 text-gray-600">
                      {property.description || "No description provided."}
                    </p>
                  </div>

                  {/* Review actions */}
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <button
                      type="button"
                      onClick={() => handleReview(property.id, "Approved")}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103A2D]"
                    >
                      <CheckCircle size={17} />
                      Approve Property
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReview(property.id, "Rejected")}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <XCircle size={17} />
                      Reject
                    </button>
                  </div>
                </div>

                {selectedImage && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5"
                    onClick={() => setSelectedImage(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute right-6 top-6 rounded-full bg-white p-3 text-gray-900 hover:bg-gray-200"
                    >
                      <X size={22} />
                    </button>

                    <img
                      src={selectedImage}
                      alt="Property preview"
                      onClick={(event) => event.stopPropagation()}
                      className="max-h-[85vh] max-w-full rounded-xl object-contain"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPropertyReviewsPage;
