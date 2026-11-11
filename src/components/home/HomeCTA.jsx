
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function HomeCTA() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-cover bg-center px-8 py-20 text-center md:px-16 md:py-28"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-[#102D24]/75" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D8C6A0]">
            Your journey starts here
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
            Your next chapter starts with the right space.
          </h2>

          <p className="mt-6 leading-7 text-white/80">
            Whether you're searching for a new home or looking for trusted
            professionals to improve your space, we're here to help.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#174C3C] transition hover:bg-[#F7F3EA]"
            >
              Explore properties
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-7 py-4 text-sm font-semibold text-[#fff] transition hover:bg-white/10"
            >
              Explore home services
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCTA