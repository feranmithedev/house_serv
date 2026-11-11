
import { Link } from 'react-router-dom'
import { House, ArrowLeft } from 'lucide-react'

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#F7F3EA] px-6 py-20">
      <div className="max-w-lg text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#174C3C]/10 text-[#174C3C]">
          <House size={38} />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#174C3C]">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-bold text-[#252925] md:text-5xl">
          Looks like you're lost.
        </h1>

        <p className="mt-5 text-base leading-7 text-gray-600">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to finding your next home.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-6 py-3 font-semibold text-white transition hover:bg-[#10382C]"
        >
          <ArrowLeft size={18} />
          Back to homepage
        </Link>

      </div>
    </div>
  )
}

export default NotFoundPage