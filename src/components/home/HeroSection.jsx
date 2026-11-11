
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, ArrowRight } from 'lucide-react'

function HeroSection() {
  const [location, setLocation] = useState('')
  const [listingType, setListingType] = useState('Rent')

  const navigate = useNavigate()

  function handleSearch() {
    navigate(
      `/properties?location=${encodeURIComponent(location)}&type=${encodeURIComponent(listingType)}`
    )
  }
  return (
    <section className="bg-[#F7F3EA]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">

        {/* Hero content */}
        <div>
          <span className="mb-6 inline-flex items-center rounded-full bg-[#E5EBE4] px-4 py-2 text-sm font-medium text-[#174C3C]">
            Your space. Your comfort. Your choice.
          </span>

          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#252925] md:text-6xl">
            Find a place to call
            <span className="text-[#174C3C]"> home.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 md:text-lg">
            Discover properties that fit your lifestyle and
            connect with trusted professionals to make your
            space truly yours.
          </p>
          
          {/* Search bar */}
          <div className="mt-8 flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm sm:flex-row sm:items-center">

            {/* Location input */}
            <div className="flex flex-1 items-center gap-3 px-3">
              <MapPin size={20} className="shrink-0 text-[#174C3C]" />

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter a location"
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>

            {/* Listing type */}
            <div className="border-t border-gray-100 px-3 sm:border-l sm:border-t-0">
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full cursor-pointer bg-transparent py-3 text-sm font-medium text-[#252925] outline-none sm:w-auto"
              >
                <option value="Rent">Rent</option>
                <option value="Buy">Buy</option>
              </select>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#174C3C] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#10382C]"
            >
              <Search size={18} />
              Search properties
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-[#174C3C]">
              Explore
            </span>
            <span>rentals, properties for sale and home services.</span>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"
              alt="Beautiful modern residential home"
              className="h-[350px] w-full object-cover md:h-[520px]"
            />
          </div>

          <div className="absolute -bottom-5 left-5 rounded-xl bg-white p-4 shadow-lg md:left-[-25px]">
            <p className="text-sm font-semibold text-[#252925]">
              More than a property
            </p>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
              <span>Find your next beginning</span>
              <ArrowRight size={16} className="text-[#174C3C]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection