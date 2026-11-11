import { Link } from "react-router-dom";
import {
  ClipboardList,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useProviderApplications } from "../context/useProviderApplications";

function ServiceProviderDashboard() {
  const { applications } = useProviderApplications();

  const user = JSON.parse(localStorage.getItem("houseServUser") || "{}");

  const providerApplication = applications.find(
    (application) =>
      application.id === user.providerApplicationId ||
      application.email === user.email,
  );

  const applicationStatus =
    providerApplication?.status ||
    user.providerApplicationStatus ||
    "Pending Verification";

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#174C3C]">
            SERVICE PROVIDER DASHBOARD
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925]">
            Welcome, {user.fullName || "Service Provider"}
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your professional profile and home service activities.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-[#174C3C]/10 bg-white p-7">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#174C3C]/10 p-3">
              <ShieldCheck className="text-[#174C3C]" size={28} />
            </div>

            <div className="flex-1">
              {user.profileComplete ? (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-[#252925]">
                      Professional Profile
                    </h2>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Completed
                    </span>
                  </div>

                  <p className="mt-2 leading-7 text-gray-600">
                    Your professional profile has been submitted successfully.
                    You can edit your information while your application is
                    being reviewed.
                  </p>

                  <div className="mt-4">
                    <span
                      className={`rounded-full px-3 py-2 text-sm font-semibold ${
                        applicationStatus === "Approved"
                          ? "bg-green-100 text-green-700"
                          : applicationStatus === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {applicationStatus}
                    </span>
                  </div>

                  <Link
                    to="/dashboard/provider/profile"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#174C3C] px-5 py-3 font-semibold text-[#174C3C] transition hover:bg-[#174C3C] hover:text-white"
                  >
                    Edit Profile
                    <ArrowRight size={18} />
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#252925]">
                    Complete your professional profile
                  </h2>

                  <p className="mt-2 leading-7 text-gray-600">
                    Before you can offer services on House&Serv, you'll need to
                    provide information about your experience, services and
                    professional background. Your application will then be
                    reviewed by our team.
                  </p>

                  <Link
                    to="/dashboard/provider/profile"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 font-semibold text-white transition hover:bg-[#10392D]"
                  >
                    Complete Profile
                    <ArrowRight size={18} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10">
              <ClipboardList size={25} className="text-[#174C3C]" />
            </div>

            <h3 className="text-lg font-bold text-[#252925]">
              Service Requests
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              View and manage requests from customers once your professional
              account has been approved.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10">
              <ClipboardList size={25} className="text-[#174C3C]" />
            </div>

            <h3 className="text-lg font-bold text-[#252925]">
              Service Requests
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              View and manage requests from customers once your professional
              account has been approved.
            </p>

            {applicationStatus === "Approved" && (
              <Link
                to="/dashboard/provider/requests"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10392D]"
              >
                Manage Requests
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderDashboard;
