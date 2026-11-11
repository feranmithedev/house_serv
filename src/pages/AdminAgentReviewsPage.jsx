import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { useAgentApplications } from "../context/useAgentApplications";

function AdminAgentReviewsPage() {
  const { applications, updateApplication } = useAgentApplications();
  const [message, setMessage] = useState("");

  const pendingApplications = applications.filter(
    (application) => application.status === "Pending"
  );

  const reviewedApplications = applications.filter(
    (application) => application.status !== "Pending"
  );

  function handleReview(applicationId, status) {
    const action = status === "Approved" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this agent application?`
    );

    if (!confirmed) return;

    updateApplication(applicationId, {
      status,
      reviewedAt: new Date().toISOString(),
    });

    setMessage(`Agent application ${status.toLowerCase()} successfully.`);
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#174C3C] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#252925]">
            Agent Applications
          </h1>

          <p className="mt-3 text-gray-600">
            Review agent applications and manage their approval status.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-xl bg-[#174C3C]/10 p-4 text-sm font-medium text-[#174C3C]">
            {message}
          </div>
        )}

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pending Applications</p>
            <p className="mt-2 text-3xl font-bold text-[#252925]">
              {pendingApplications.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Reviewed Applications</p>
            <p className="mt-2 text-3xl font-bold text-[#252925]">
              {reviewedApplications.length}
            </p>
          </div>
        </div>

        <section>
          <h2 className="mb-5 text-xl font-bold text-[#252925]">
            Pending Review
          </h2>

          {pendingApplications.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <Clock size={32} className="mx-auto text-gray-400" />

              <h3 className="mt-4 font-bold text-[#252925]">
                No pending applications
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                New agent applications will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {pendingApplications.map((application) => (
                <div
                  key={application.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Pending
                      </span>

                      <h3 className="mt-4 text-xl font-bold text-[#252925]">
                        {application.fullName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {application.agencyName}
                      </p>
                    </div>

                    <p className="text-xs text-gray-400">
                      Submitted{" "}
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-400">Email address</p>
                      <p className="mt-1 text-sm text-[#252925]">
                        {application.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Phone number</p>
                      <p className="mt-1 text-sm text-[#252925]">
                        {application.phone}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-400">Business address</p>
                      <p className="mt-1 text-sm text-[#252925]">
                        {application.businessAddress}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                    <button
                      onClick={() => handleReview(application.id, "Approved")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10392D]"
                    >
                      <CheckCircle size={17} />
                      Approve Application
                    </button>

                    <button
                      onClick={() => handleReview(application.id, "Rejected")}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <XCircle size={17} />
                      Reject Application
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {reviewedApplications.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 text-xl font-bold text-[#252925]">
              Previously Reviewed
            </h2>

            <div className="space-y-3">
              {reviewedApplications.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-[#252925]">
                      {application.fullName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {application.agencyName}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      application.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default AdminAgentReviewsPage;
