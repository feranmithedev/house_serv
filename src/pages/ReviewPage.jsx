import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import { useServiceRequests } from "../context/useServiceRequests";
import { useReviews } from "../context/useReviews";

export default function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { serviceRequests } = useServiceRequests();
  const { reviews, addReview } = useReviews();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const request = serviceRequests.find(
    (item) => String(item.id) === String(id),
  );

  const alreadyReviewed = reviews.some(
    (review) => String(review.requestId) === String(id),
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!request || request.status !== "Completed" || alreadyReviewed) {
      return;
    }

    if (!comment.trim()) {
      alert("Please write a short review before submitting.");
      return;
    }

    addReview({
      requestId: request.id,
      providerId: request.providerId,
      providerName: request.providerName,
      serviceName: request.serviceName,
      rating,
      comment: comment.trim(),
    });

    navigate("/activity");
  }

  if (!request) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#252925]">Request not found</h2>
        <Link to="/activity" className="mt-5 inline-block text-[#174C3C]">
          Return to Activity
        </Link>
      </div>
    );
  }

  if (request.status !== "Completed" || alreadyReviewed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#252925]">
          {alreadyReviewed ? "Review already submitted" : "Review unavailable"}
        </h2>
        <p className="mt-3 text-gray-600">
          {alreadyReviewed
            ? "You have already reviewed this service request."
            : "You can only review a service after it has been completed."}
        </p>
        <Link
          to="/activity"
          className="mt-6 inline-flex rounded-lg bg-[#174C3C] px-5 py-3 text-white"
        >
          Return to Activity
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        to="/activity"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#174C3C]"
      >
        <ArrowLeft size={18} />
        Back to Activity
      </Link>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <span className="text-sm font-semibold text-[#174C3C]">
          SHARE YOUR EXPERIENCE
        </span>

        <h1 className="mt-3 text-3xl font-bold text-[#252925]">
          Rate this service
        </h1>

        <p className="mt-2 text-gray-600">
          How was your experience with {request.providerName}?
        </p>

        <div className="mt-6 rounded-xl bg-[#F7F3EA] p-4">
          <p className="font-semibold text-[#252925]">{request.serviceName}</p>
          <p className="mt-1 text-sm text-gray-600">
            Service provider: {request.providerName}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block font-semibold text-[#252925]">
            Your rating
          </label>

          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setRating(number)}
                aria-label={`Rate ${number} out of 5`}
                className="transition hover:scale-110"
              >
                <Star
                  size={34}
                  fill={number <= rating ? "#D9A441" : "none"}
                  color={number <= rating ? "#D9A441" : "#D1D5DB"}
                />
              </button>
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-500">{rating} out of 5 stars</p>

          <label
            htmlFor="comment"
            className="mt-7 block font-semibold text-[#252925]"
          >
            Write your review
          </label>

          <textarea
            id="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tell us about your experience with this service provider..."
            rows={5}
            required
            className="mt-3 w-full rounded-xl border border-gray-200 p-4 text-sm outline-none transition focus:border-[#174C3C] focus:ring-2 focus:ring-[#174C3C]/10"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#174C3C] px-6 py-4 font-semibold text-white transition hover:bg-[#10382C]"
          >
            Submit review
          </button>
        </form>
      </div>
    </div>
  );
}
