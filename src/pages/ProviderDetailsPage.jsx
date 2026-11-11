import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  BriefcaseBusiness,
  ArrowLeft,
  CheckCircle,
  Phone,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import services from "../data/services";

import { useMarketplaceProviders } from "../context/useMarketplaceProviders";

function ProviderDetailsPage() {
  const { id } = useParams();

  const providers = useMarketplaceProviders();

  const provider = providers.find((item) => String(item.id) === String(id));

  const service = provider
    ? services.find((item) => item.id === provider.serviceId)
    : null;

  if (!provider) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7F3EA] px-6 text-center">
        <h1 className="text-3xl font-bold text-[#252925]">
          Provider not found
        </h1>

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
      <div className="mx-auto max-w-5xl">
        <Link
          to={`/services/${provider.serviceId}/providers`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C]"
        >
          <ArrowLeft size={17} />
          Back to providers
        </Link>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#174C3C]/10 text-[#174C3C]">
            <BriefcaseBusiness size={36} />
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            {service?.name}
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-5xl">
            {provider.name}
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-gray-600">
            {provider.description}
          </p>

          <div className="mt-8 grid gap-5 border-y border-gray-100 py-7 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <MapPin className="text-[#174C3C]" size={21} />
              <div>
                <p className="text-xs text-gray-400">Location</p>
                <p className="font-semibold text-[#252925]">
                  {provider.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="text-[#174C3C]" size={21} />
              <div>
                <p className="text-xs text-gray-400">Experience</p>
                <p className="font-semibold text-[#252925]">
                  {provider.experience}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-[#174C3C]" size={21} />
              <h2 className="text-xl font-bold text-[#252925]">
                About this provider
              </h2>
            </div>

            <p className="mt-4 leading-7 text-gray-600">
              {provider.description}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            {provider.phone && (
              <a
                href={`tel:${provider.phone}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#174C3C] px-5 py-3 font-semibold text-[#174C3C] transition hover:bg-[#174C3C]/10"
              >
                <Phone size={18} />
                Call provider
              </a>
            )}

            {provider.whatsapp && (
              <a
                href={`https://wa.me/${provider.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#174C3C] px-5 py-3 font-semibold text-white transition hover:bg-[#10382C]"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            )}
          </div>

          <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <ShieldCheck className="mt-0.5 shrink-0 text-amber-700" size={21} />

            <div>
              <h3 className="font-semibold text-amber-900">
                Important: Keep your service requests on House&Serv
              </h3>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                You can contact this provider to ask questions and discuss your
                needs. However, all official service requests, agreements and
                payments must be initiated and completed through House&Serv.
                Please do not finalize service deals through phone calls or
                private messages.
              </p>
            </div>
          </div>

          <Link
            to={`/providers/${provider.id}/request`}
            className="mt-10 flex w-full items-center justify-center rounded-lg bg-[#174C3C] px-6 py-4 font-semibold text-white transition hover:bg-[#10382C] sm:w-auto"
          >
            Request this service
          </Link>
        </div>

        <p className="mt-6 text-xs leading-5 text-gray-400">
          This is a demonstration provider profile. The provider information has
          not been independently verified.
        </p>
      </div>
    </div>
  );
}

export default ProviderDetailsPage;
