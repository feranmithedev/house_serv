import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { useProviderApplications } from "../context/useProviderApplications";

function ProviderProfileCompletionPage() {
  const navigate = useNavigate();

  const { applications, addApplication, updateApplication } =
    useProviderApplications();

  const user = JSON.parse(localStorage.getItem("houseServUser") || "{}");

  const existingApplication = applications.find(
    (application) =>
      application.id === user.providerApplicationId ||
      application.email === user.email
  );

  const [selectedCategories, setSelectedCategories] = useState(
    () => existingApplication?.serviceCategories || []
  );

  const [message, setMessage] = useState("");

  const serviceCategories = [
    "Electrical",
    "Plumbing",
    "Painting",
    "POP & Ceilings",
    "Carpentry",
    "Cleaning",
  ];

  function handleCategoryChange(category) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (selectedCategories.length === 0) {
      setMessage("Please select at least one service category.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const application = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      businessName: formData.get("businessName"),
      serviceCategories: selectedCategories,
      experience: formData.get("experience"),
      businessAddress: formData.get("businessAddress"),
      qualification: formData.get("qualification"),
      description: formData.get("description"),
      portfolioLink: formData.get("portfolioLink"),
    };

    let applicationId;

    if (existingApplication) {
      applicationId = existingApplication.id;

      updateApplication(applicationId, {
        ...application,
        status: "Pending",
        submittedAt: new Date().toISOString(),
      });
    } else {
      applicationId = addApplication(application);
    }

    localStorage.setItem(
      "houseServUser",
      JSON.stringify({
        ...user,
        profileComplete: true,
        providerApplicationId: applicationId,
        providerApplicationStatus: "Pending",
      })
    );

    navigate("/dashboard/provider");
  }

  return (
    <div className="min-h-screen bg-[#F7F3EA] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/dashboard/provider"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#174C3C]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#174C3C]/10">
            <BriefcaseBusiness size={28} className="text-[#174C3C]" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-[#174C3C]">
            Professional Profile
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#252925]">
            {existingApplication
              ? "Edit your professional profile"
              : "Tell us about your services"}
          </h1>

          <p className="mt-3 leading-7 text-gray-600">
            Provide accurate information about your experience and professional
            background. Our team will review your application before you can
            offer services on House&Serv.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-2xl bg-white p-7 shadow-sm sm:p-10"
        >
          <section>
            <h2 className="mb-5 text-xl font-bold text-[#252925]">
              Business Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Business name (optional)
                </label>

                <input
                  type="text"
                  name="businessName"
                  defaultValue={existingApplication?.businessName || ""}
                  placeholder="Enter your business name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium">
                  Services you offer
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {serviceCategories.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 accent-[#174C3C]"
                      />

                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Years of experience
                </label>

                <input
                  type="number"
                  name="experience"
                  min="0"
                  required
                  defaultValue={existingApplication?.experience || ""}
                  placeholder="e.g. 3"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Business address
                </label>

                <input
                  type="text"
                  name="businessAddress"
                  required
                  defaultValue={existingApplication?.businessAddress || ""}
                  placeholder="Enter your business or operating address"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          <section>
            <h2 className="mb-5 text-xl font-bold text-[#252925]">
              Professional Background
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Qualifications or certifications
                </label>

                <textarea
                  name="qualification"
                  rows={3}
                  defaultValue={existingApplication?.qualification || ""}
                  placeholder="Describe relevant training, qualifications or certifications. If you have none, state that."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Describe your services
                </label>

                <textarea
                  name="description"
                  rows={5}
                  required
                  defaultValue={existingApplication?.description || ""}
                  placeholder="Tell customers about your experience and the services you provide..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Portfolio or previous work link (optional)
                </label>

                <input
                  type="url"
                  name="portfolioLink"
                  defaultValue={existingApplication?.portfolioLink || ""}
                  placeholder="https://example.com/your-work"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#174C3C]"
                />
              </div>
            </div>
          </section>

          {message && (
            <p className="text-sm font-medium text-red-600">{message}</p>
          )}

          <div className="rounded-xl bg-[#F7F3EA] p-4">
            <p className="text-sm leading-6 text-gray-600">
              {existingApplication
                ? "Saving changes will send your application back for review."
                : "By submitting, you confirm that the information provided is accurate. Your application will be marked as Pending until an administrator reviews it."}
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#174C3C] py-4 font-semibold text-white transition hover:bg-[#10392D]"
          >
            {existingApplication
              ? "Save Profile Changes"
              : "Submit for Verification"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProviderProfileCompletionPage;
