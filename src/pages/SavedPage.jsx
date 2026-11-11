import { Bookmark, House } from "lucide-react";
import PropertyCard from "../components/properties/PropertyCard";
import { Link } from "react-router-dom";
import properties from "../data/properties";

import { useSavedProperties } from "../context/useSavedProperties";
import { useProperties } from "../context/useProperties";

function SavedPage() {
  const { savedProperties } = useSavedProperties();
  const { agentProperties } = useProperties();

  const allProperties = [
    ...properties,
    ...agentProperties.filter(
      (property) => property.listingStatus === "Approved",
    ),
  ];

  const savedListings = allProperties.filter((property) =>
    savedProperties.includes(property.id),
  );

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Your collection
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-5xl">
            Saved properties
          </h1>

          <p className="mt-4 text-gray-600">
            Keep track of the properties you love and want to revisit.
          </p>
        </div>

        {savedListings.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                {savedListings.length} saved properties
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {savedListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
            <Bookmark size={45} className="mx-auto text-[#174C3C]/50" />

            <h2 className="mt-5 text-xl font-bold text-[#252925]">
              No saved properties yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              When you find a property you love, tap the heart icon to save it
              here for easy access later.
            </p>

            <Link
              to="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10382C]"
            >
              <House size={17} />
              Explore properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedPage;
