
import { ArrowRight } from 'lucide-react'
import ServiceCard from '../services/ServiceCard'

const services = [
  {
    id: 1,
    name: 'Electrical',
    description: 'Installation and repairs',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 2,
    name: 'Plumbing',
    description: 'Reliable plumbing solutions',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 3,
    name: 'Painting',
    description: 'Give your space a fresh look',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 4,
    name: 'POP & Ceilings',
    description: 'Beautiful ceiling designs',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 5,
    name: 'Carpentry',
    description: 'Custom woodwork and furniture',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 6,
    name: 'Cleaning',
    description: 'Keep your home spotless',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=85',
  },
]

function HomeServices() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
              Everything your home needs
            </p>

            <h2 className="text-3xl font-bold text-[#252925] md:text-4xl">
              Home services, simplified.
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Find skilled professionals for the work that
              makes your house feel like home.
            </p>
          </div>

          <button className="hidden items-center gap-2 text-sm font-semibold text-[#174C3C] sm:flex">
            Explore services
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>

        {/* Mobile button */}
        <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-[#174C3C] py-3 font-semibold text-[#174C3C] sm:hidden">
          Explore services
          <ArrowRight size={18} />
        </button>

      </div>
    </section>
  )
}

export default HomeServices