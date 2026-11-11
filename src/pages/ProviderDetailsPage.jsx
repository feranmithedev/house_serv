import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  BriefcaseBusiness,
  ArrowLeft,
  CheckCircle,
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";

import services from "../data/services";

import { useMarketplaceProviders } from "../context/useMarketplaceProviders";
import { useReviews } from "../context/useReviews";

function ProviderDetailsPage() {
  const { id } = useParams();

  const providers = useMarketplaceProviders();
  const { reviews } = useReviews();

  const providerReviews = reviews.filter(
    (review) => String(review.providerId) === String(id),
  );

  const averageRating =
    providerReviews.length > 0
      ? (
          providerReviews.reduce(
            (total, review) => total + Number(review.rating),
            0,
          ) / providerReviews.length
        ).toFixed(1)
      : "0.0";

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

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={20} fill="#D9A441" color="#D9A441" />
              <span className="font-bold text-[#252925]">{averageRating}</span>
            </div>

            <span className="text-sm text-gray-500">
              {providerReviews.length}{" "}
              {providerReviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>

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

          <div className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-bold text-[#252925]">
              Customer reviews
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Feedback from customers who have used this provider's services.
            </p>

            {providerReviews.length === 0 ? (
              <div className="mt-6 rounded-xl bg-[#F7F3EA] p-6 text-center">
                <p className="font-medium text-[#252925]">No reviews yet</p>
                <p className="mt-2 text-sm text-gray-500">
                  Customer reviews will appear here after completed services.
                </p>
              </div>
            ) : (
              <div className="mt-6 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                {providerReviews.map((review) => (
                  <div
                    key={review.id}
                    className="min-w-70 max-w-[320px] shrink-0 snap-start rounded-xl border border-gray-100 p-5 sm:min-w-[320px]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((number) => (
                          <Star
                            key={number}
                            size={17}
                            fill={
                              number <= Number(review.rating)
                                ? "#D9A441"
                                : "none"
                            }
                            color={
                              number <= Number(review.rating)
                                ? "#D9A441"
                                : "#D1D5DB"
                            }
                          />
                        ))}
                      </div>

                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-4 leading-7 text-gray-700">
                      {review.comment}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-[#174C3C]">
                      House&Serv customer
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
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
