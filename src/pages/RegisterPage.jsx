import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseBusiness, House, Wrench } from "lucide-react";

function RegisterPage() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("finder");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const fullName = formData.get("fullName").trim();
    const email = formData.get("email").trim();
    const phone = formData.get("phone").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (fullName.length < 2 || !/^[\p{L}\s'-]+$/u.test(fullName)) {
      setMessage("Please enter a valid full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^\+?[\d\s()-]{10,20}$/.test(phone)) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    const userProfile = {
      fullName,
      email,
      phone,
      accountType,
      profileComplete: accountType === "finder",
    };

    localStorage.setItem("houseServUser", JSON.stringify(userProfile));

    if (accountType === "finder") {
      navigate("/dashboard/house-finder");
    } else if (accountType === "agent") {
      navigate("/dashboard/agent");
    } else {
      navigate("/dashboard/provider");
    }
  }

  const accountOptions = [
    {
      id: "finder",
      title: "House Finder",
      description: "I'm looking to rent or buy a property.",
      icon: House,
    },
    {
      id: "agent",
      title: "Real Estate Agent",
      description: "I want to list properties and manage inspections.",
      icon: BriefcaseBusiness,
    },
    {
      id: "provider",
      title: "Service Provider",
      description: "I offer professional home services.",
      icon: Wrench,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto flex min-h-[calc(100vh-18rem)] max-w-2xl flex-col justify-center">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Join House&Serv
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-4xl">
            Create your account
          </h1>

          <p className="mt-4 text-gray-600">
            Find a home, list properties or offer professional services.
          </p>
        </div>

        {/* Registration Card */}
        <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-10">
          {/* Account Type */}
          <h2 className="mb-5 text-lg font-bold text-[#252925]">
            Choose your account type
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accountOptions.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setAccountType(option.id);
                    setMessage("");
                  }}
                  className={`rounded-xl border-2 p-5 text-left transition ${
                    accountType === option.id
                      ? "border-[#174C3C] bg-[#174C3C]/5"
                      : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <Icon size={28} className="mb-4 text-[#174C3C]" />

                  <h3 className="font-bold text-[#252925]">{option.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Registration Information */}
          {accountType !== "finder" && (
            <div className="mt-6 rounded-xl bg-[#F7F3EA] p-4">
              <p className="text-sm leading-6 text-gray-600">
                {accountType === "agent"
                  ? "After creating your account, complete your professional profile to apply for agent verification and unlock property listing features."
                  : "After creating your account, complete your professional profile to apply for service provider verification and start offering your services."}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#252925]">
                Full name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#252925]">
                Email address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#252925]">
                Phone number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="e.g. 08012345678"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#252925]">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#252925]">
                Confirm password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Enter your password again"
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm font-medium text-[#174C3C] hover:underline"
            >
              {showPassword ? "Hide passwords" : "Show passwords"}
            </button>

            {message && (
              <p className="text-center text-sm font-medium text-red-600">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#174C3C] py-3.5 font-semibold text-white transition hover:bg-[#10392D]"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
