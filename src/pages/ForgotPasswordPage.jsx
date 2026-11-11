import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

function ForgotPasswordPage() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      "If an account exists with this email, password recovery instructions will be sent."
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto flex min-h-[calc(100vh-18rem)] max-w-md flex-col justify-center">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#174C3C]/10">
            <Mail size={30} className="text-[#174C3C]" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Account recovery
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925]">
            Forgot your password?
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            Enter the email address associated with your account. We'll help you
            recover access.
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

            <button
              type="submit"
              className="w-full rounded-xl bg-[#174C3C] py-3.5 font-semibold text-white transition hover:bg-[#10392D]"
            >
              Send recovery instructions
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-xl bg-[#174C3C]/5 p-4 text-center text-sm leading-6 text-[#174C3C]">
              {message}
            </p>
          )}

          <Link
            to="/login"
            className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-[#174C3C] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;