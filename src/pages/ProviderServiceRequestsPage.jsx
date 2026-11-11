import { useProviderApplications } from "../context/useProviderApplications";
import { useServiceRequests } from "../context/useServiceRequests";
import {
  ClipboardList,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

function ProviderServiceRequestsPage() {
  const { applications } = useProviderApplications();

  const { serviceRequests, updateServiceRequestStatus } = useServiceRequests();

  const user = JSON.parse(localStorage.getItem("houseServUser") || "{}");

  const application = applications.find(
    (item) =>
      item.id === user.providerApplicationId || item.email === user.email
  );

  const isApproved = application?.status === "Approved";

  const providerRequests = serviceRequests.filter(
    (request) =>
      request.providerApplicationId === application?.id ||
      request.providerEmail === user.email
  );

  function handleStatusChange(requestId, status) {
    const confirmed = window.confirm(
      `Are you sure you want to ${status.toLowerCase()} this request?`
    );

    if (!confirmed) return;

    updateServiceRequestStatus(requestId, status);
  }

  if (!isApproved) {
    return (
      <div className="min-h-[70vh] bg-[#F7F3EA] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">
          <Clock size={40} className="mx-auto text-amber-600" />

          <h1 className="mt-5 text-2xl font-bold text-[#252925]">
            Professional access unavailable
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            You must have an approved provider application before you can access
            customer service requests.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-[#174C3C]">
          PROVIDER DASHBOARD
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-4xl">
          Service Requests
        </h1>

        <p className="mt-3 text-gray-600">
          Manage customer requests submitted to {application.businessName}.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total requests</p>
            <p className="mt-2 text-3xl font-bold text-[#252925]">
              {providerRequests.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {
                providerRequests.filter(
                  (request) => request.status === "Pending"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Accepted</p>
            <p className="mt-2 text-3xl font-bold text-green-700">
              {
                providerRequests.filter(
                  (request) => request.status === "Accepted"
                ).length
              }
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {providerRequests.length > 0 ? (
            providerRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#174C3C]">
                      {request.serviceName}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-[#252925]">
                      {request.customerName}
                    </h2>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      request.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : request.status === "Declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={18} className="text-[#174C3C]" />
                    {request.phone}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={18} className="text-[#174C3C]" />
                    {request.location || "Location not provided"}
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-[#F7F3EA] p-5">
                  <p className="text-sm font-semibold text-[#252925]">
                    Service description
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {request.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {request.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(request.id, "Accepted")
                        }
                        className="flex items-center gap-2 rounded-lg bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#10382C]"
                      >
                        <CheckCircle size={17} />
                        Accept request
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(request.id, "Declined")
                        }
                        className="flex items-center gap-2 rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        <XCircle size={17} />
                        Decline request
                      </button>
                    </>
                  )}
                </div>

                <p className="mt-5 text-xs text-gray-400">
                  Submitted {new Date(request.createdAt).toLocaleString()}
                </p>
              </article>
            ))
          ) : (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <ClipboardList size={40} className="mx-auto text-[#174C3C]/50" />

              <h2 className="mt-4 text-xl font-bold text-[#252925]">
                No service requests yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Customer requests sent to your business will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderServiceRequestsPage;
