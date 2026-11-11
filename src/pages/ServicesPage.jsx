
import {
  Zap,
  Droplets,
  Paintbrush,
  Layers,
  Hammer,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import services from '../data/services'
const serviceIcons = {
  Zap,
  Droplets,
  Paintbrush,
  Layers,
  Hammer,
  Sparkles,
}

function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EA]">

      {/* Hero Section */}
      <section className="bg-[#174C3C] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D7C7A3]">
            House&Serv home services
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Everything your home needs, all in one place.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            From everyday repairs to major home improvements, discover
            services that help you maintain, improve and enjoy your space.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
              Browse services
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#252925] md:text-4xl">
              What does your home need?
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              Explore our service categories and find the right help for
              your next home project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon]

              return (
                <div
                  key={service.id}
                  className="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C] transition group-hover:bg-[#174C3C] group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#252925]">
                    {service.name}
                  </h3>

                  <p className="mt-3 min-h-16 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>

                  <Link
                    to={`/services/${service.id}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] transition hover:gap-3"
                  >
                    Explore service
                    <ArrowRight size={17} />
                  </Link>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white px-7 py-14 text-center shadow-sm md:px-16">
          <h2 className="text-3xl font-bold text-[#252925] md:text-4xl">
            Need help with your home?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Explore our service categories and discover professionals
            who can help bring your home projects to life.
          </p>

          <Link
            to="/properties"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-6 py-3 font-semibold text-white transition hover:bg-[#10382C]"
          >
            Explore properties
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default ServicesPage