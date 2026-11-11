import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  BriefcaseBusiness,
  ArrowLeft,
  ArrowRight,
  Users,
} from "lucide-react";

import services from "../data/services";
import { useMarketplaceProviders } from "../context/useMarketplaceProviders";

function ServiceProvidersPage() {
  const { id } = useParams();

  const providers = useMarketplaceProviders();

  const service = services.find((item) => item.id === Number(id));

  const serviceProviders = providers.filter(
    (provider) => provider.serviceId === Number(id)
  );

  if (!service) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7F3EA] px-6 text-center">
        <h1 className="text-3xl font-bold text-[#252925]">Service not found</h1>

        <Link
          to="/services"
          className="mt-6 rounded-lg bg-[#174C3C] px-6 py-3 font-semibold text-white"
        >
          Back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          to={`/services/${id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C]"
        >
          <ArrowLeft size={17} />
          Back to {service.name}
        </Link>

        <div className="mb-10 mt-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Find professionals
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-5xl">
            {service.name} providers
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            Browse professionals offering {service.name.toLowerCase()}
            and find someone who can help with your project.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-3 rounded-xl bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C]">
            <Users size={23} />
          </div>

          <div>
            <p className="text-2xl font-bold text-[#252925]">
              {serviceProviders.length}
            </p>
            <p className="text-sm text-gray-500">Available sample providers</p>
          </div>
        </div>

        {serviceProviders.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceProviders.map((provider) => (
              <article
                key={provider.id}
                className="rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#174C3C]/10 text-[#174C3C]">
                  <BriefcaseBusiness size={25} />
                </div>

                <h2 className="mt-6 text-xl font-bold text-[#252925]">
                  {provider.name}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  {provider.location}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <BriefcaseBusiness size={16} />
                  {provider.experience}
                </div>

                <p className="mt-5 min-h-16 text-sm leading-6 text-gray-600">
                  {provider.description}
                </p>

                <Link
                  to={`/providers/${provider.id}`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#174C3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10382C]"
                >
                  View provider
                  <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <Users size={40} className="mx-auto text-[#174C3C]/50" />

            <h2 className="mt-4 text-xl font-bold text-[#252925]">
              No providers available yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              We're working on bringing more professionals to this category.
            </p>
          </div>
        )}

        <p className="mt-8 text-xs leading-5 text-gray-400">
          These are demonstration profiles for development purposes. They are
          not verified service providers.
        </p>
      </div>
    </div>
  );
}

export default ServiceProvidersPage;
