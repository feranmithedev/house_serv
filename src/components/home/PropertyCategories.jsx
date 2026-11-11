import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    name: "Apartments",
    description: "Modern spaces for comfortable living",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Houses",
    description: "Find a place for the whole family",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Land",
    description: "Discover land for your next project",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Commercial",
    description: "Spaces built for business",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
  },
];

function PropertyCategories() {

  const navigate = useNavigate()

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
              Find your space
            </p>

            <h2 className="text-3xl font-bold text-[#252925] md:text-4xl">
              Explore by category
            </h2>

            <p className="mt-3 text-gray-500">
              Discover a property that suits your needs.
            </p>
          </div>

          <button
            onClick={() => navigate('/properties')}
            className="hidden items-center gap-2 text-sm font-semibold text-[#174C3C] transition hover:gap-3 sm:flex"
          >
            View all
            <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              onClick={() =>
                navigate(`/properties?category=${encodeURIComponent(category.name)}`)
              }
              key={category.name}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-52 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-semibold text-[#252925]">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-[#174C3C] transition group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PropertyCategories;
