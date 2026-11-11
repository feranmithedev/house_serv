
import { Link } from 'react-router-dom'
import {
  House,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-[#12382D] px-6 pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#174C3C]">
                <House size={22} />
              </div>

              <span className="text-xl font-bold">
                House<span className="text-[#D8C6A0]">&</span>Serv
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
              Find your perfect space and connect with trusted professionals
              who make every house feel like home.
            </p>

            
            <div className="mt-6 flex gap-3">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.5-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                    </svg>
                </a>

                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8h3.4z" />
                    </svg>
                </a>

                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                    <path d="M5.2 3a2.2 2.2 0 110 4.4 2.2 2.2 0 010-4.4zM3.3 9h3.8v12H3.3V9zm6.1 0H13v1.6h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7V21h-3.8v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.4V9z" />
                    </svg>
                </a>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold">Quick Links</h3>

            <div className="flex flex-col gap-4 text-sm text-white/65">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/properties" className="hover:text-white">Properties</Link>
              <Link to="/services" className="hover:text-white">Home Services</Link>
              <Link to="/saved" className="hover:text-white">Saved Properties</Link>
              <Link to="/activity" className="hover:text-white">My Activity</Link>
            </div>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="mb-5 font-semibold">Properties</h3>

            <div className="flex flex-col gap-4 text-sm text-white/65">
              <Link to="/properties" className="hover:text-white">Apartments</Link>
              <Link to="/properties" className="hover:text-white">Houses</Link>
              <Link to="/properties" className="hover:text-white">Land</Link>
              <Link to="/properties" className="hover:text-white">Commercial Spaces</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold">Get in Touch</h3>

            <div className="flex flex-col gap-5 text-sm text-white/65">
              <div className="flex items-start gap-3">
                <Mail size={18} className="shrink-0 text-[#D8C6A0]" />
                <span>hello@houseandserv.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="shrink-0 text-[#D8C6A0]" />
                <span>Contact information coming soon</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 text-[#D8C6A0]" />
                <span>Nigeria</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center text-xs text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} House&Serv. All rights reserved.
          </p>

          <p>Made for better living.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer