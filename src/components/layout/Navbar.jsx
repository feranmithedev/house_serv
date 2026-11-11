import { useState } from "react";
import { NavLink } from "react-router-dom";
import { House, Bookmark, UserCircle, Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Services", path: "/services" },
  ];

  const linkStyle = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "text-[#174C3C] border-b-2 border-[#174C3C] pb-1"
        : "text-gray-600 hover:text-[#174C3C]"
    }`;

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#174C3C]">
            <House size={22} color="white" />
          </div>

          <span className="text-xl font-bold text-[#174C3C]">House&Serv</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={linkStyle}>
              {link.name}
            </NavLink>
          ))}

          <NavLink to="/activity" className={linkStyle}>
            Activity
          </NavLink>
        </div>

        {/* Desktop actions */}
        {/* Desktop actions */}
        <div className="hidden items-center gap-5 md:flex">
          <NavLink
            to="/login"
            className="text-sm font-semibold text-gray-600 transition hover:text-[#174C3C]"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="rounded-lg bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10382C]"
          >
            Create Account
          </NavLink>

          <NavLink to="/saved" aria-label="Saved properties">
            <Bookmark size={21} className="text-gray-600" />
          </NavLink>

          <NavLink to="/profile" aria-label="Your profile">
            <UserCircle size={23} className="text-gray-600" />
          </NavLink>

          <NavLink
            to="/dashboard/agent/properties/new"
            className="rounded-lg border border-[#174C3C] px-5 py-3 text-sm font-semibold text-[#174C3C] transition hover:bg-[#174C3C] hover:text-white"
          >
            List a Property
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-gray-100 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/activity"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Activity
            </NavLink>

            <NavLink
              to="/saved"
              onClick={() => setMenuOpen(false)}
              className={linkStyle}
            >
              Saved Properties
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className={linkStyle}
            >
              My Profile
            </NavLink>

            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={linkStyle}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-lg bg-[#174C3C] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Create Account
            </NavLink>

            <NavLink
              to="/dashboard/agent/properties/new"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded-lg bg-[#174C3C] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              List a Property
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
