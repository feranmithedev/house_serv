import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { House, Bookmark, UserCircle, Menu, X } from "lucide-react";

import { useAuth } from "../../context/useAuth";
import { apiRequest } from "../../services/api";

function Navbar() {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");

    try {
      await apiRequest("/api/logout", {
        method: "POST",
      });

      setUser(null);
      setMenuOpen(false);
      navigate("/");
    } catch (error) {
      setLogoutError(error.message || "Unable to log out. Please try again.");
    }
  }

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <header className="relative w-full border-b border-gray-200 bg-white">
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
        <div className="hidden items-center gap-5 md:flex">
          {!loading &&
            (user ? (
              <>
                {user.role === "agent" && (
                  <NavLink
                    to="/dashboard/agent/properties/new"
                    className="rounded-lg border border-[#174C3C] px-5 py-3 text-sm font-semibold text-[#174C3C] transition hover:bg-[#174C3C] hover:text-white"
                  >
                    List a Property
                  </NavLink>
                )}

                <NavLink to="/saved" aria-label="Saved properties">
                  <Bookmark size={21} className="text-gray-600" />
                </NavLink>

                <NavLink to="/profile" aria-label="Your profile">
                  <UserCircle size={23} className="text-gray-600" />
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-semibold text-gray-600 transition hover:text-[#174C3C]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {logoutError && (
        <p className="px-5 py-2 text-sm text-red-600" role="alert">
          {logoutError}
        </p>
      )}

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 z-50 border-b border-gray-200 bg-white px-5 py-5 shadow-lg md:hidden"
        >
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

            {user && (
              <NavLink
                to="/activity"
                onClick={() => setMenuOpen(false)}
                className={linkStyle}
              >
                Activity
              </NavLink>
            )}

            {!loading &&
              (user ? (
                <>
                  {user.role === "house_finder" && (
                    <>
                      <NavLink
                        to="/dashboard/house-finder"
                        onClick={() => setMenuOpen(false)}
                        className={linkStyle}
                      >
                        Dashboard
                      </NavLink>

                      <NavLink
                        to="/saved"
                        onClick={() => setMenuOpen(false)}
                        className={linkStyle}
                      >
                        Saved Properties
                      </NavLink>
                    </>
                  )}

                  {user.role === "agent" && (
                    <>
                      <NavLink
                        to="/dashboard/agent"
                        onClick={() => setMenuOpen(false)}
                        className={linkStyle}
                      >
                        Agent Dashboard
                      </NavLink>

                      <NavLink
                        to="/dashboard/agent/properties"
                        onClick={() => setMenuOpen(false)}
                        className={linkStyle}
                      >
                        My Listings
                      </NavLink>

                      <NavLink
                        to="/dashboard/agent/inspections"
                        onClick={() => setMenuOpen(false)}
                        className={linkStyle}
                      >
                        Inspections
                      </NavLink>

                      <NavLink
                        to="/dashboard/agent/properties/new"
                        onClick={() => setMenuOpen(false)}
                        className={linkStyle}
                      >
                        List a Property
                      </NavLink>
                    </>
                  )}

                  {user.role === "service_provider" && (
                    <NavLink
                      to="/dashboard/provider"
                      onClick={() => setMenuOpen(false)}
                      className={linkStyle}
                    >
                      Provider Dashboard
                    </NavLink>
                  )}

                  {user.role === "admin" && (
                    <NavLink
                      to="/dashboard/admin"
                      onClick={() => setMenuOpen(false)}
                      className={linkStyle}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}

                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className={linkStyle}
                  >
                    My Profile
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left text-sm font-semibold text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                    className="text-sm font-semibold text-[#174C3C]"
                  >
                    Create Account
                  </NavLink>
                </>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
