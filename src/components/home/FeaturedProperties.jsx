
import { ArrowRight } from 'lucide-react'
import PropertyCard from '../properties/PropertyCard'
import properties from '../../data/properties'

function FeaturedProperties() {
  return (
    <section className="bg-[#F7F3EA] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
              Handpicked for you
            </p>

            <h2 className="text-3xl font-bold text-[#252925] md:text-4xl">
              Featured properties
            </h2>

            <p className="mt-3 text-gray-500">
              Explore some of our available properties.
            </p>
          </div>

          <button className="hidden items-center gap-2 text-sm font-semibold text-[#174C3C] transition hover:gap-3 sm:flex">
            View all properties
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Property cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="mt-8 sm:hidden">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#174C3C] py-3 font-semibold text-[#174C3C]">
            View all properties
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  )
}

export default FeaturedProperties