import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email").trim();
    const password = formData.get("password");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!password || password.trim().length === 0) {
      setMessage("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setMessage("Your password must be at least 8 characters long.");
      return;
    }

    setMessage(
      "Your details are valid. Login authentication is not connected yet.",
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto flex min-h-[calc(100vh-18rem)] max-w-md flex-col justify-center">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Welcome back
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925]">
            Login to House&Serv
          </h1>

          <p className="mt-4 text-gray-600">
            Enter your details to access your account.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                minLength={8}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mt-2 text-sm font-medium text-[#174C3C] hover:underline"
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-[#174C3C] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {message && (
              <p
                role="alert"
                className="text-center text-sm font-medium text-red-600"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#174C3C] py-3.5 font-semibold text-white transition hover:bg-[#10392D]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#174C3C] hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
