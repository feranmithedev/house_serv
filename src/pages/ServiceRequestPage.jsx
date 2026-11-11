import { useParams, Link, useNavigate } from "react-router-dom";
import { useServiceRequests } from "../context/useServiceRequests";
import { ArrowLeft, ClipboardList, MapPin } from "lucide-react";

import services from "../data/services";

import { useMarketplaceProviders } from "../context/useMarketplaceProviders";

function ServiceRequestPage() {
  const { id } = useParams();

  const providers = useMarketplaceProviders();

  const navigate = useNavigate();
  const { addServiceRequest } = useServiceRequests();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    addServiceRequest({
      providerId: provider.id,
      providerApplicationId: provider.applicationId || null,
      providerEmail: provider.email || null,
      providerType: provider.providerType || "demo",

      providerName: provider.name,
      serviceId: service.id,
      serviceName: service.name,

      customerName: formData.get("fullName"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      description: formData.get("description"),
    });

    navigate("/activity");
  }

  const provider = providers.find((item) => String(item.id) === id);

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
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/providers/${provider.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C]"
        >
          <ArrowLeft size={17} />
          Back to provider
        </Link>

        <div className="mb-10 mt-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Official service request
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925] md:text-5xl">
            Request a service
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            Tell us what you need. Your request will be submitted through
            House&Serv.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-sm md:p-10">
          <div className="rounded-xl bg-[#F7F3EA] p-5">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-[#174C3C]" size={24} />

              <div>
                <p className="text-xs text-gray-500">Service</p>
                <h2 className="font-bold text-[#252925]">{service?.name}</h2>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <MapPin className="text-[#174C3C]" size={21} />

              <div>
                <p className="text-xs text-gray-500">Provider</p>
                <p className="font-semibold text-[#252925]">{provider.name}</p>
                <p className="text-sm text-gray-500">{provider.location}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252925]">
                Your full name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252925]">
                Phone number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252925]">
                Service location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Where do you need the service?"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#252925]">
                Describe the service you need
              </label>

              <textarea
                rows="5"
                name="description"
                placeholder="Tell us what you need help with..."
                required
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#174C3C]"
              />
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <h3 className="font-semibold text-amber-900">
                Your protection matters to us
              </h3>

              <p className="mt-2 text-sm leading-6 text-amber-900">
                By submitting this request, you agree to use House&Serv for all
                official service arrangements and applicable payments.
                House&Serv takes responsibility for managing the request
                process, providing support, addressing complaints and helping
                resolve issues that may arise throughout the service engagement,
                in accordance with our platform policies. Please report any
                concerns through our official channels so we can assist you.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#174C3C] px-6 py-4 font-semibold text-white transition hover:bg-[#10382C]"
            >
              Submit service request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequestPage;
