import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";

import { useInspections } from "../context/useInspections";

import properties from "../data/properties";
import { useProperties } from "../context/useProperties";

function InspectionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addInspection } = useInspections();
  const { agentProperties } = useProperties();
  const [inspectionDate, setInspectionDate] = useState("");
  const [message, setMessage] = useState("");
  const today = new Date().toLocaleDateString("en-CA");
  const currentTime = new Date().toTimeString().slice(0, 5);

  const minimumTime = inspectionDate === today ? currentTime : undefined;

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const fullName = formData.get("fullName").trim();
    const phone = formData.get("phone").trim();
    const date = formData.get("inspectionDate");
    const time = formData.get("inspectionTime");

    const phoneDigits = phone.replace(/\D/g, "");

    if (fullName.length < 2 || !/^[\p{L}\s'-]+$/u.test(fullName)) {
      setMessage("Please enter a valid full name.");
      return;
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    if (!date) {
      setMessage("Please select an inspection date.");
      return;
    }

    if (date < today) {
      setMessage("Inspection date cannot be in the past.");
      return;
    }

    if (!time) {
      setMessage("Please select an inspection time.");
      return;
    }

    if (date === today && time <= currentTime) {
      setMessage("Please select a future inspection time.");
      return;
    }

    addInspection({
      propertyId: property.id,
      propertyName: property.name,
      propertyLocation: property.location,
      agentId: property.agentId || null,
      customerName: fullName,
      phone,
      inspectionDate: date,
      inspectionTime: time,
    });

    navigate("/activity");
  }

  const property =
    properties.find((item) => item.id === Number(id)) ||
    agentProperties.find(
      (item) => item.id === Number(id) && item.listingStatus === "Approved",
    );

  if (!property) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-[#174C3C]">
          Property not found
        </h2>

        <button
          onClick={() => navigate("/properties")}
          className="mt-5 rounded-full bg-[#174C3C] px-6 py-3 text-white"
        >
          Back to properties
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#174C3C]"
        >
          <ArrowLeft size={18} />
          Go back
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Property inspection
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925]">
            Schedule a visit
          </h1>

          <p className="mt-3 leading-7 text-gray-500">
            Choose your preferred date and time to visit this property.
          </p>

          <div className="mt-8 rounded-2xl bg-[#F7F3EA] p-5">
            <h2 className="font-bold text-[#252925]">{property.name}</h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} />
              {property.location}
            </p>

            <p className="mt-3 font-bold text-[#174C3C]">
              {property.price}
              <span className="ml-1 text-sm font-normal text-gray-500">
                {property.priceSuffix}
              </span>
            </p>
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
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
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
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252925]">
                <CalendarDays size={17} className="text-[#174C3C]" />
                Preferred inspection date
              </label>

              <input
                type="date"
                name="inspectionDate"
                value={inspectionDate}
                onChange={(event) => setInspectionDate(event.target.value)}
                min={new Date().toLocaleDateString("en-CA")}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252925]">
                <Clock size={17} className="text-[#174C3C]" />
                Preferred inspection time
              </label>

              <input
                type="time"
                name="inspectionTime"
                min={minimumTime}
                required
                className="..."
              />
            </div>

            {message && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-[#174C3C] px-6 py-4 font-semibold text-white transition hover:bg-[#10392D]"
            >
              Submit inspection request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InspectionPage;
