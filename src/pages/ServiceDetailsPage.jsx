import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Zap,
  Droplets,
  Paintbrush,
  Layers,
  Hammer,
  Sparkles,
} from "lucide-react";

import services from "../data/services";

const serviceIcons = {
  Zap,
  Droplets,
  Paintbrush,
  Layers,
  Hammer,
  Sparkles,
};

function ServiceDetailsPage() {
  const { id } = useParams();

  const service = services.find((item) => item.id === Number(id));

  if (!service) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7F3EA] px-6 text-center">
        <h1 className="text-3xl font-bold text-[#252925]">Service not found</h1>

        <p className="mt-3 text-gray-600">
          The service you're looking for doesn't exist.
        </p>

        <Link
          to="/services"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#174C3C] px-6 py-3 font-semibold text-white"
        >
          <ArrowLeft size={18} />
          Back to services
        </Link>
      </div>
    );
  }

  const Icon = serviceIcons[service.icon];

  return (
    <div className="min-h-screen bg-[#F7F3EA]">
      {/* Hero */}
      <section className="bg-[#174C3C] px-6 py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            All services
          </Link>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Icon size={38} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D7C7A3]">
                House&Serv home services
              </p>

              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                {service.name}
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-white/75">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Information */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
              About this service
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#252925]">
              How we can help
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
              {service.details}
            </p>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-[#252925]">
                What's included?
              </h3>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.includes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-[#174C3C]"
                    />

                    <span className="text-sm font-medium text-[#252925]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service CTA */}
          <div className="h-fit rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#174C3C]/10 text-[#174C3C]">
              <Icon size={24} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#252925]">
              Need this service?
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Find a service provider who can help with your next home project.
            </p>

            <Link
              to={`/services/${id}/providers`}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#174C3C] px-5 py-3 font-semibold text-white transition hover:bg-[#10382C]"
            >
              Find a provider
              <ArrowRight size={18} />
            </Link>

            <p className="mt-4 text-center text-xs text-gray-400">
              Provider listings will be available here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServiceDetailsPage;
