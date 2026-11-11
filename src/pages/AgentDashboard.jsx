import { Link } from "react-router-dom";
import {
  House,
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useInspections } from "../context/useInspections";

function AgentDashboard() {
  const { inspections } = useInspections();

  const totalInspections = inspections.length;

  const pendingInspections = inspections.filter(
    (inspection) => inspection.status === "Pending"
  ).length;

  const completedInspections = inspections.filter(
    (inspection) => inspection.status === "Completed"
  ).length;

  const cancelledInspections = inspections.filter(
    (inspection) => inspection.status === "Cancelled"
  ).length;

  const stats = [
    {
      title: "Properties Listed",
      value: 0,
      icon: House,
    },
    {
      title: "Inspection Requests",
      value: totalInspections,
      icon: CalendarDays,
    },
    {
      title: "Pending Requests",
      value: pendingInspections,
      icon: Clock,
    },
    {
      title: "Completed Inspections",
      value: completedInspections,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Agent Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-4xl">
            Welcome, Agent!
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your property listings and inspection requests.
          </p>
        </div>

        {/* Verification Notice */}
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <ShieldCheck className="mt-1 shrink-0 text-amber-600" size={25} />

          <div>
            <h2 className="font-bold text-amber-900">Agent verification</h2>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              Your agent verification status will appear here. Property
              publishing will be available after approval.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10">
                  <Icon size={23} className="text-[#174C3C]" />
                </div>

                <h2 className="mt-5 text-3xl font-bold text-[#252925]">
                  {stat.value}
                </h2>

                <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Inspection Overview */}
        <div className="mt-8">
          <Link
            to="/dashboard/agent/inspections"
            className="inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#103A2D]"
          >
            <CalendarDays size={18} />
            Manage inspection requests
            <ArrowRight size={17} />
          </Link>
        </div>
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#252925]">
                Inspection Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keep track of your inspection activity.
              </p>
            </div>

            <Link
              to="/activity"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] hover:underline"
            >
              View activity
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <Clock className="text-amber-500" size={25} />
              <h3 className="mt-4 text-2xl font-bold">{pendingInspections}</h3>
              <p className="mt-1 text-sm text-gray-500">Pending requests</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <CheckCircle className="text-green-600" size={25} />
              <h3 className="mt-4 text-2xl font-bold">
                {completedInspections}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Completed inspections
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <XCircle className="text-red-500" size={25} />
              <h3 className="mt-4 text-2xl font-bold">
                {cancelledInspections}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Cancelled inspections
              </p>
            </div>
          </div>
        </section>

        {/* Property Listings */}

        <section className="mt-4 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#252925]">
                Property Listings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage all your property listings.
              </p>
            </div>

            <Link
              to="/dashboard/agent/properties"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#174C3C] px-5 py-3 font-semibold text-[#174C3C] transition hover:bg-[#174C3C]/5"
            >
              Manage Listings
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AgentDashboard;
