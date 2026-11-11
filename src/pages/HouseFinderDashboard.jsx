import { Link } from "react-router-dom";
import {
  Bookmark,
  CalendarDays,
  ClipboardList,
  House,
  Search,
  Wrench,
  ArrowRight,
} from "lucide-react";

import { useSavedProperties } from "../context/useSavedProperties";
import { useInspections } from "../context/useInspections";
import { useServiceRequests } from "../context/useServiceRequests";

function HouseFinderDashboard() {
  const { savedProperties } = useSavedProperties();
  const { inspections } = useInspections();
  const { serviceRequests } = useServiceRequests();

  const dashboardStats = [
    {
      title: "Saved Properties",
      value: savedProperties.length,
      icon: Bookmark,
      link: "/saved",
    },
    {
      title: "Inspections",
      value: inspections.length,
      icon: CalendarDays,
      link: "/activity",
    },
    {
      title: "Service Requests",
      value: serviceRequests.length,
      icon: ClipboardList,
      link: "/activity",
    },
  ];

  const quickActions = [
    {
      title: "Explore Properties",
      description: "Find your next home.",
      icon: Search,
      link: "/properties",
    },
    {
      title: "Browse Home Services",
      description: "Find trusted service providers.",
      icon: Wrench,
      link: "/services",
    },
    {
      title: "View Saved Properties",
      description: "Return to properties you saved.",
      icon: Bookmark,
      link: "/saved",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            House Finder Dashboard
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-4xl">
            Welcome back!
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your properties, inspections and home service requests.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dashboardStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10">
                    <Icon size={23} className="text-[#174C3C]" />
                  </div>

                  <ArrowRight size={19} className="text-gray-400" />
                </div>

                <h2 className="mt-5 text-3xl font-bold text-[#252925]">
                  {stat.value}
                </h2>

                <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
              </Link>
            );
          })}
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#252925]">Quick Actions</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  to={action.link}
                  className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#174C3C]/10">
                    <Icon size={23} className="text-[#174C3C]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#252925]">{action.title}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-[#174C3C] p-8 text-white sm:p-10">
          <div className="max-w-xl">
            <House size={32} />

            <h2 className="mt-5 text-2xl font-bold">
              Your next home could be here.
            </h2>

            <p className="mt-3 leading-7 text-white/75">
              Explore available properties and schedule an inspection to find a
              place that feels like home.
            </p>

            <Link
              to="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#174C3C] transition hover:bg-[#F7F3EA]"
            >
              Explore properties
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HouseFinderDashboard;
