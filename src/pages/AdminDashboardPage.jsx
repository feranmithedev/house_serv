import { Link } from "react-router-dom";
import {
  Users,
  House,
  BriefcaseBusiness,
  Wrench,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useProperties } from "../context/useProperties";
import { useAgentApplications } from "../context/useAgentApplications";
import { useProviderApplications } from "../context/useProviderApplications";

function AdminDashboardPage() {
  const { agentProperties } = useProperties();
  const { applications: agentApplications } = useAgentApplications();
  const { applications: providerApplications } = useProviderApplications();

  const registeredUsers = JSON.parse(
    localStorage.getItem("houseServUsers") || "[]",
  );

  const houseFinders = registeredUsers.filter(
    (user) => user.accountType === "finder",
  );

  const realEstateAgents = registeredUsers.filter(
    (user) => user.accountType === "agent",
  );

  const serviceProviders = registeredUsers.filter(
    (user) => user.accountType === "provider",
  );

  const pendingAgents = agentApplications.filter(
    (application) => application.status === "Pending",
  );

  const pendingProviders = providerApplications.filter(
    (application) => application.status === "Pending",
  );

  const pendingProperties = agentProperties.filter(
    (property) => property.listingStatus === "Pending Review",
  );

  const approvedProperties = agentProperties.filter(
    (property) => property.listingStatus === "Approved",
  );

  const rejectedProperties = agentProperties.filter(
    (property) => property.listingStatus === "Rejected",
  );

  const draftProperties = agentProperties.filter(
    (property) => property.listingStatus === "Draft",
  );

  const stats = [
    {
      title: "Registered Users",
      value: registeredUsers.length,
      description: "Total accounts created",
      icon: Users,
    },
    {
      title: "Property Listings",
      value: agentProperties.length,
      description: `${pendingProperties.length} awaiting approval`,
      icon: House,
    },
    {
      title: "Pending Agent Applications",
      value: pendingAgents.length,
      description: "Agents awaiting verification",
      icon: BriefcaseBusiness,
    },
    {
      title: "Pending Provider Applications",
      value: pendingProviders.length,
      description: "Providers awaiting verification",
      icon: Wrench,
    },
  ];

  const reviewSections = [
    {
      title: "Property Reviews",
      description:
        "Review submitted property listings and approve or reject them.",
      pending: pendingProperties.length,
      link: "/dashboard/admin/properties",
      icon: House,
    },
    {
      title: "Agent Verification",
      description:
        "Review real estate agent applications and verify their professional details.",
      pending: pendingAgents.length,
      link: "/dashboard/admin/agents",
      icon: BriefcaseBusiness,
    },
    {
      title: "Provider Verification",
      description:
        "Review service provider applications and approve qualified professionals.",
      pending: pendingProviders.length,
      link: "/admin/provider-reviews",
      icon: Wrench,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            House&Serv Administration
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-600">
            Monitor platform activity and manage verification requests.
          </p>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C]">
                  <Icon size={24} />
                </div>

                <h2 className="mt-5 text-3xl font-bold text-[#252925]">
                  {stat.value}
                </h2>

                <p className="mt-2 text-sm font-semibold text-[#252925]">
                  {stat.title}
                </p>

                <p className="mt-2 text-xs text-gray-500">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Property Listing Breakdown */}
        <div className="mt-8">
          <h2 className="mb-5 text-xl font-bold text-[#252925]">
            Property Listing Breakdown
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-gray-500">
                Approved Properties
              </p>

              <h3 className="mt-3 text-3xl font-bold text-green-700">
                {approvedProperties.length}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Properties approved for listing
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-gray-500">
                Rejected Properties
              </p>

              <h3 className="mt-3 text-3xl font-bold text-red-600">
                {rejectedProperties.length}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Properties that were rejected
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-gray-500">
                Draft Properties
              </p>

              <h3 className="mt-3 text-3xl font-bold text-gray-700">
                {draftProperties.length}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Listings saved but not submitted
              </p>
            </div>
          </div>
        </div>

        {/* User Account Breakdown */}
        <div className="mt-10">
          <h2 className="mb-5 text-xl font-bold text-[#252925]">
            User Account Breakdown
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-gray-500">House Finders</p>

              <h3 className="mt-3 text-3xl font-bold text-[#174C3C]">
                {houseFinders.length}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Users looking for properties
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-gray-500">
                Real Estate Agents
              </p>

              <h3 className="mt-3 text-3xl font-bold text-[#174C3C]">
                {realEstateAgents.length}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Accounts registered as agents
              </p>
            </div>

            <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-gray-500">
                Service Providers
              </p>

              <h3 className="mt-3 text-3xl font-bold text-[#174C3C]">
                {serviceProviders.length}
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                Accounts registered as providers
              </p>
            </div>
          </div>
        </div>

        {/* Review Management */}
        <div className="mt-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#252925]">
              Review Management
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage property listings, agent applications and service provider
              applications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {reviewSections.map((section) => {
              const Icon = section.icon;

              return (
                <div
                  key={section.title}
                  className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C]">
                      <Icon size={24} />
                    </div>

                    <span className="rounded-full bg-[#F7F3EA] px-3 py-1 text-xs font-semibold text-[#174C3C]">
                      {section.pending} pending
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#252925]">
                    {section.title}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">
                    {section.description}
                  </p>

                  <Link
                    to={section.link}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C] transition hover:gap-3"
                  >
                    Manage reviews
                    <ArrowRight size={17} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admin Notice */}
        <div className="mt-12 flex items-start gap-3 rounded-2xl bg-[#E5EBE4] p-4 sm:gap-4 sm:p-6">
          <ShieldCheck size={25} className="mt-1 shrink-0 text-[#174C3C]" />

          <div className="min-w-0">
            <h3 className="font-bold text-[#252925]">
              Platform administration
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Use the review sections to manage submitted listings and
              professional applications. Approval decisions will update their
              respective platform records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
