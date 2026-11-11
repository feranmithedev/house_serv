import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  ClipboardList,
} from "lucide-react";

import { useInspections } from "../context/useInspections";

function AgentInspectionsPage() {
  const { inspections, acceptInspection, declineInspection } = useInspections();

  const currentAgentId = "demo-agent";

  const agentInspections = inspections.filter(
    (inspection) => inspection.agentId === currentAgentId
  );

  const [filter, setFilter] = useState("All");

  const filters = [
    "All",
    "Pending",
    "Accepted",
    "Declined",
    "Cancelled",
    "Completed",
  ];

  const filteredInspections =
    filter === "All"
      ? agentInspections
      : agentInspections.filter((inspection) => inspection.status === filter);

  function handleAccept(inspectionId) {
    if (window.confirm("Accept this inspection request?")) {
      acceptInspection(inspectionId);
    }
  }

  function handleDecline(inspectionId) {
    if (window.confirm("Decline this inspection request?")) {
      declineInspection(inspectionId);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Navigation */}
        <Link
          to="/dashboard/agent"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>

        {/* Page Header */}
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Agent Workspace
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-4xl">
            Inspection Requests
          </h1>

          <p className="mt-3 text-gray-600">
            Review and manage property inspection requests from house finders.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                filter === item
                  ? "bg-[#174C3C] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Inspection Requests */}
        <section className="mt-8">
          {filteredInspections.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <ClipboardList size={42} className="mx-auto text-[#174C3C]/50" />

              <h2 className="mt-4 text-xl font-bold text-[#252925]">
                {filter === "All"
                  ? "No inspection requests yet"
                  : `No ${filter.toLowerCase()} requests`}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Inspection requests will appear here when house finders schedule
                visits for your properties.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredInspections.map((inspection) => (
                <article
                  key={inspection.id}
                  className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
                >
                  {/* Property and Status */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#174C3C]">
                        Property Inspection
                      </p>

                      <h2 className="mt-2 text-xl font-bold text-[#252925]">
                        {inspection.propertyName}
                      </h2>

                      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={16} />
                        {inspection.propertyLocation}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${
                        inspection.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : inspection.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : inspection.status === "Declined"
                          ? "bg-red-100 text-red-800"
                          : inspection.status === "Cancelled"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {inspection.status}
                    </span>
                  </div>

                  {/* House Finder Details */}
                  <div className="mt-6 rounded-xl bg-[#F7F3EA] p-5">
                    <h3 className="font-bold text-[#252925]">
                      House Finder Details
                    </h3>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-gray-500">Full name</p>
                        <p className="mt-1 font-semibold text-[#252925]">
                          {inspection.customerName}
                        </p>
                      </div>

                      <div>
                        <p className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone size={14} />
                          Phone number
                        </p>
                        <p className="mt-1 font-semibold text-[#252925]">
                          {inspection.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Inspection Schedule */}
                  <div className="mt-5 flex flex-wrap gap-6">
                    <div>
                      <p className="flex items-center gap-2 text-xs text-gray-500">
                        <CalendarDays size={15} />
                        Inspection date
                      </p>
                      <p className="mt-1 font-semibold text-[#252925]">
                        {inspection.inspectionDate}
                      </p>
                    </div>

                    <div>
                      <p className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={15} />
                        Inspection time
                      </p>
                      <p className="mt-1 font-semibold text-[#252925]">
                        {inspection.inspectionTime}
                      </p>
                    </div>
                  </div>

                  {/* Request Actions */}
                  {inspection.status === "Pending" && (
                    <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                      <button
                        onClick={() => handleAccept(inspection.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103A2D]"
                      >
                        <CheckCircle size={17} />
                        Accept request
                      </button>

                      <button
                        onClick={() => handleDecline(inspection.id)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <XCircle size={17} />
                        Decline request
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AgentInspectionsPage;
