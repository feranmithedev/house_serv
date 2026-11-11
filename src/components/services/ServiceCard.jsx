
import { ArrowUpRight } from 'lucide-react'

function ServiceCard({ service }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between p-5">
        <div>
          <h3 className="font-semibold text-[#252925]">
            {service.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {service.description}
          </p>
        </div>

        <ArrowUpRight
          size={20}
          className="shrink-0 text-[#174C3C]"
        />
      </div>

    </article>
  )
}

export default ServiceCard