import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CalendarDays,
  Clock,
  ClipboardList,
  Wrench,
  House,
  ArrowLeft,
} from "lucide-react";
import { useServiceRequests } from "../context/useServiceRequests";
import { useInspections } from "../context/useInspections";
import { useReviews } from "../context/useReviews";

function ActivityPage() {
  const { serviceRequests } = useServiceRequests();
  const { reviews } = useReviews();
  const { inspections, cancelInspection, completeInspection } =
    useInspections();
  const [inspectionFilter, setInspectionFilter] = useState("All");
  const [serviceRequestFilter, setServiceRequestFilter] = useState("All");

  const totalInspections = inspections.length;
  const pendingInspections = inspections.filter(
    (inspection) => inspection.status === "Pending",
  ).length;
  const cancelledInspections = inspections.filter(
    (inspection) => inspection.status === "Cancelled",
  ).length;
  const completedInspections = inspections.filter(
    (inspection) => inspection.status === "Completed",
  ).length;

  const filteredInspections =
    inspectionFilter === "All"
      ? inspections
      : inspections.filter(
          (inspection) => inspection.status === inspectionFilter,
        );

  const totalRequests = serviceRequests.length;

  const filteredServiceRequests =
    serviceRequestFilter === "All"
      ? serviceRequests
      : serviceRequests.filter(
          (request) => request.status === serviceRequestFilter,
        );

  const pendingRequests = serviceRequests.filter(
    (request) => request.status === "Pending",
  ).length;
  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/dashboard/agent"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#174C3C] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Your dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-5xl">
            Your activity
          </h1>

          <p className="mt-4 text-gray-600">
            Keep track of your property inspections and home service requests.
          </p>
        </div>

        {/* Activity Overview */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C]">
              <CalendarDays size={23} />
            </div>

            <p className="text-sm text-gray-500">Total inspections</p>

            <h2 className="mt-2 text-3xl font-bold text-[#252925]">
              {totalInspections}
            </h2>

            <p className="mt-3 text-sm text-yellow-700">
              {pendingInspections} pending
            </p>

            <p className="mt-1 text-sm text-red-600">
              {cancelledInspections} cancelled
            </p>

            <p className="mt-1 text-sm text-green-700">
              {completedInspections} completed
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C]">
              <Wrench size={23} />
            </div>
            <p className="text-sm text-gray-500">Service requests</p>

            <h2 className="mt-2 text-3xl font-bold text-[#252925]">
              {totalRequests}
            </h2>

            <p className="mt-3 text-sm text-green-700">
              {
                serviceRequests.filter(
                  (request) => request.status === "Completed",
                ).length
              }{" "}
              completed
            </p>

            <p className="mt-1 text-sm text-purple-700">
              {
                serviceRequests.filter(
                  (request) => request.status === "In Progress",
                ).length
              }{" "}
              in progress
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C]">
              <Clock size={23} />
            </div>
            <p className="text-sm text-gray-500">Pending requests</p>
            <h2 className="mt-2 text-3xl font-bold text-[#252925]">
              {pendingRequests}
            </h2>
          </div>
        </div>

        {/* Property Inspections */}
        <section className="mb-10">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <House size={22} className="text-[#174C3C]" />
              <h2 className="text-xl font-bold text-[#252925]">
                Property Inspections
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "All",
                "Pending",
                "Accepted",
                "Declined",
                "Completed",
                "Cancelled",
              ].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setInspectionFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    inspectionFilter === filter
                      ? "bg-[#174C3C] text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredInspections.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <CalendarDays size={40} className="mx-auto text-[#174C3C]/50" />

              <h3 className="mt-4 text-lg font-bold text-[#252925]">
                {inspectionFilter === "All"
                  ? "No inspections yet"
                  : `No ${inspectionFilter.toLowerCase()} inspections`}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {inspectionFilter === "All"
                  ? "When you schedule a property inspection, your upcoming visits and their status will appear here."
                  : `You don't have any ${inspectionFilter.toLowerCase()} inspections yet. Try selecting another filter.`}
              </p>

              {inspectionFilter === "All" && (
                <Link
                  to="/properties"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10382C]"
                >
                  <House size={17} />
                  Explore properties
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {filteredInspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="text-lg font-bold text-[#252925]">
                        {inspection.propertyName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {inspection.propertyLocation}
                      </p>
                    </div>

                    <span
                      className={`h-fit w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                        inspection.status === "Cancelled"
                          ? "bg-gray-100 text-gray-700"
                          : inspection.status === "Declined"
                            ? "bg-red-100 text-red-700"
                            : inspection.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : inspection.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {inspection.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                    <p>Name: {inspection.customerName}</p>
                    <p>Phone: {inspection.phone}</p>
                    <p>Date: {inspection.inspectionDate}</p>
                    <p>Time: {inspection.inspectionTime}</p>
                  </div>

                  <div className="mt-5 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-gray-500">
                      Request ID: {inspection.id}
                    </p>

                    {(inspection.status === "Pending" ||
                      inspection.status === "Accepted") && (
                      <div className="flex flex-wrap gap-3">
                        {inspection.status === "Accepted" && (
                          <button
                            onClick={() => {
                              const confirmed = window.confirm(
                                "Have you attended this inspection and want to mark it as completed?",
                              );

                              if (confirmed) {
                                completeInspection(inspection.id);
                              }
                            }}
                            disabled={
                              new Date(
                                `${inspection.inspectionDate}T${inspection.inspectionTime}`,
                              ) > new Date()
                            }
                            className="rounded-full bg-[#174C3C] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#10392D] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Mark as completed
                          </button>
                        )}

                        <button
                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure you want to cancel this inspection?",
                            );

                            if (confirmed) {
                              cancelInspection(inspection.id);
                            }
                          }}
                          className="rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Cancel inspection
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Home Service Requests */}
        <section>
          <div className="mb-5">
            <div className="mb-5 flex items-center gap-3">
              <Wrench size={22} className="text-[#174C3C]" />
              <h2 className="text-xl font-bold text-[#252925]">
                Home service requests
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "All",
                "Pending",
                "Accepted",
                "In Progress",
                "Completed",
                "Cancelled",
              ].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setServiceRequestFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    serviceRequestFilter === filter
                      ? "bg-[#174C3C] text-white"
                      : "bg-white text-[#555] hover:bg-[#EAEFEA]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredServiceRequests.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <ClipboardList size={40} className="mx-auto text-[#174C3C]/50" />

              <h3 className="mt-4 text-lg font-bold text-[#252925]">
                {serviceRequestFilter === "All"
                  ? "No service requests yet"
                  : `No ${serviceRequestFilter.toLowerCase()} requests`}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                When you request a home service, you will be able to track its
                progress here.
              </p>

              {serviceRequestFilter === "All" && (
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10382C]"
                >
                  <Wrench size={17} />
                  Explore home services
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {filteredServiceRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="text-lg font-bold text-[#252925]">
                        {request.serviceName}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Provider: {request.providerName}
                      </p>
                    </div>

                    <span
                      className={`h-fit w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                        request.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : request.status === "Declined"
                            ? "bg-red-100 text-red-700"
                            : request.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : request.status === "Cancelled"
                                ? "bg-gray-100 text-gray-700"
                                : request.status === "In Progress"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                    <p>Location: {request.location}</p>
                    <p>Phone: {request.phone}</p>
                    <p>
                      Date requested:{" "}
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                    <p>Request ID: {request.id}</p>
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-[#252925]">
                      Service description
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {request.description}
                    </p>
                  </div>

                  {request.status === "Completed" && (
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      {reviews.some(
                        (review) =>
                          String(review.requestId) === String(request.id),
                      ) ? (
                        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                          Review submitted
                        </span>
                      ) : (
                        <Link
                          to={`/services/review/${request.id}`}
                          className="inline-flex rounded-lg bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10382C]"
                        >
                          Leave a review
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ActivityPage;
