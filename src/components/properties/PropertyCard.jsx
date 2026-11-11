import { BedDouble, Bath, Ruler, MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSavedProperties } from '../../context/useSavedProperties'

function PropertyCard({ property }) {

  const navigate = useNavigate();
  const { toggleSaved, isSaved } = useSavedProperties()

  return (
    <article
      onClick={() => navigate(`/properties/${property.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Property image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-md bg-[#174C3C] px-3 py-1.5 text-xs font-semibold text-white">
          {property.status}
        </span>

        <button
          type="button"
          aria-label={isSaved(property.id) ? 'Remove from saved properties' : 'Save property'}
          onClick={(e) => {
            e.stopPropagation()
            toggleSaved(property.id)
          }}
          className={`absolute right-4 top-4 rounded-full bg-white p-2.5 shadow-sm transition ${
            isSaved(property.id)
              ? 'text-red-500'
              : 'text-gray-600 hover:text-red-500'
          }`}
        >
          <Heart
            size={19}
            fill={isSaved(property.id) ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Property information */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={15} className="text-[#174C3C]" />
          {property.location}
        </div>

        <h3 className="text-lg font-semibold text-[#252925]">
          {property.name}
        </h3>

        <p className="mt-2 text-xl font-bold text-[#174C3C]">
          {property.price}
          <span className="ml-1 text-xs font-normal text-gray-500">
            {property.priceSuffix}
          </span>
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          {property.type !== "Land" && (
            <>
              <span className="flex items-center gap-1">
                <BedDouble size={16} />
                {property.bedrooms} Beds
              </span>

              <span className="flex items-center gap-1">
                <Bath size={16} />
                {property.bathrooms} Baths
              </span>
            </>
          )}

          <span className="flex items-center gap-1">
            <Ruler size={16} />
            {property.size}
          </span>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
