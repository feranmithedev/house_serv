import { useParams } from "react-router-dom";
import { MapPin, BedDouble, Bath, Ruler, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import properties from "../data/properties";
import PropertyGallery from "../components/properties/PropertyGallery";
import { useProperties } from "../context/useProperties";

function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { agentProperties } = useProperties();

  const property =
    properties.find((item) => item.id === Number(id)) ||
    agentProperties.find(
      (item) => item.id === Number(id) && item.listingStatus === "Approved"
    );

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#174C3C]">
          Property not found
        </h2>

        <button
          onClick={() => navigate("/properties")}
          className="mt-5 rounded-full bg-[#174C3C] px-6 py-3 text-white"
        >
          Back to properties
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#174C3C]"
        >
          <ArrowLeft size={18} />
          Go back
        </button>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <PropertyGallery
            images={property.images}
            propertyName={property.name}
          />

          <div className="p-8">
            <span className="rounded-full bg-[#174C3C] px-4 py-2 text-xs font-semibold text-white">
              {property.status}
            </span>

            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#174C3C] shadow-sm">
              {property.type}
            </span>

            <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div>
                <h1 className="text-3xl font-bold text-[#252925]">
                  {property.name}
                </h1>

                <p className="mt-3 flex items-center gap-2 text-gray-500">
                  <MapPin size={18} />
                  {property.location}
                </p>
              </div>

              <p className="text-2xl font-bold text-[#174C3C]">
                {property.price}
                <span className="ml-1 text-sm font-normal text-gray-500">
                  {property.priceSuffix}
                </span>
              </p>
            </div>

            <div
              className={`grid gap-4 ${
                property.type === "Land" ? "grid-cols-1" : "grid-cols-3"
              }`}
            >
              {property.type !== "Land" && (
                <>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <BedDouble className="mb-2 text-[#174C3C]" size={22} />
                    <p className="text-lg font-bold">{property.bedrooms}</p>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <Bath className="mb-2 text-[#174C3C]" size={22} />
                    <p className="text-lg font-bold">{property.bathrooms}</p>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                  </div>
                </>
              )}

              <div className="rounded-xl bg-gray-50 p-4">
                <Ruler className="mb-2 text-[#174C3C]" size={22} />
                <p className="text-lg font-bold">{property.size}</p>
                <p className="text-sm text-gray-500">Property Size</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#252925]">
                About this property
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {property.description}
              </p>
            </div>

            <button
              onClick={() => navigate(`/properties/${property.id}/inspection`)}
              className="mt-8 w-full rounded-full bg-[#174C3C] px-6 py-4 font-semibold text-white transition hover:bg-[#10392D] md:w-auto"
            >
              Schedule an inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
